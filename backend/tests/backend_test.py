"""Backend API tests for 'Who Are My Clients?' — Supabase migration validation.

Covers:
- Public: POST /api/leads, POST /api/contact, GET /api/resources
- Admin auth: POST /api/admin/login, GET /api/admin/me
- Admin data: GET /api/admin/leads, /api/admin/contacts, /api/admin/stats
- Validation: invalid email, empty message
"""
import os
import uuid
import pytest
import requests


BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    with open("/app/frontend/.env") as f:
        for line in f:
            if line.startswith("REACT_APP_BACKEND_URL="):
                BASE_URL = line.split("=", 1)[1].strip().rstrip("/")
                break

API = f"{BASE_URL}/api"
ADMIN_PASSWORD = "WhoAreMyClients2026!"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def admin_token(client):
    r = client.post(f"{API}/admin/login", json={"password": ADMIN_PASSWORD})
    if r.status_code != 200:
        pytest.skip(f"Admin login failed: {r.status_code} {r.text}")
    return r.json()["token"]


@pytest.fixture(scope="module")
def auth_client(admin_token):
    s = requests.Session()
    s.headers.update({
        "Content-Type": "application/json",
        "Authorization": f"Bearer {admin_token}",
    })
    return s


# ---------- Health ----------
class TestHealth:
    def test_root(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"
        assert "Who Are My Clients" in data.get("message", "")


# ---------- Leads (public create + admin list) ----------
class TestLeads:
    created_ids = []

    def test_create_lead_persists_in_supabase(self, client, auth_client):
        email = f"test_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "first_name": "TEST_Jane",
            "last_name": "Doe",
            "email": email,
            "role": "just-launched",
            "source": "chapter_download",
            "locale": "en",
        }
        r = client.post(f"{API}/leads", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["first_name"] == "TEST_Jane"
        assert data["email"] == email.lower()
        assert data["role"] == "just-launched"
        assert data["source"] == "chapter_download"
        assert data["locale"] == "en"
        assert "id" in data and len(data["id"]) >= 32  # UUID
        assert "created_at" in data and data["created_at"]
        TestLeads.created_ids.append(data["id"])

        # verify persistence via admin endpoint
        r2 = auth_client.get(f"{API}/admin/leads")
        assert r2.status_code == 200
        leads = r2.json()
        assert any(lead["id"] == data["id"] and lead["email"] == email.lower() for lead in leads)

    def test_lead_default_source(self, client):
        email = f"test_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "first_name": "TEST_NoSrc",
            "last_name": "User",
            "email": email,
            "role": "other",
        }
        r = client.post(f"{API}/leads", json=payload)
        assert r.status_code == 200
        data = r.json()
        assert data["source"] == "chapter_download"
        assert data["locale"] == "en"
        TestLeads.created_ids.append(data["id"])

    def test_lead_fr_locale(self, client):
        email = f"test_{uuid.uuid4().hex[:8]}@example.com"
        r = client.post(f"{API}/leads", json={
            "first_name": "TEST_Fr",
            "last_name": "User",
            "email": email,
            "role": "other",
            "locale": "FR",
        })
        assert r.status_code == 200
        assert r.json()["locale"] == "fr"
        TestLeads.created_ids.append(r.json()["id"])

    def test_lead_invalid_email_422(self, client):
        r = client.post(f"{API}/leads", json={
            "first_name": "Bad",
            "last_name": "Email",
            "email": "not-an-email",
            "role": "other",
        })
        assert r.status_code == 422

    def test_lead_missing_fields_422(self, client):
        r = client.post(f"{API}/leads", json={"email": "a@b.co"})
        assert r.status_code == 422


# ---------- Contact (public create + admin list) ----------
class TestContact:
    created_ids = []

    def test_create_contact_persists(self, client, auth_client):
        email = f"test_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "name": "TEST_Contact",
            "email": email,
            "message": "Hello, this is a test message.",
            "locale": "en",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == "TEST_Contact"
        assert data["email"] == email.lower()
        assert data["message"] == payload["message"]
        assert data["locale"] == "en"
        assert "id" in data
        TestContact.created_ids.append(data["id"])

        r2 = auth_client.get(f"{API}/admin/contacts")
        assert r2.status_code == 200
        contacts = r2.json()
        assert any(c["id"] == data["id"] for c in contacts)

    def test_contact_invalid_email_422(self, client):
        r = client.post(f"{API}/contact", json={
            "name": "x", "email": "not-email", "message": "hi"
        })
        assert r.status_code == 422

    def test_contact_empty_message_422(self, client):
        r = client.post(f"{API}/contact", json={
            "name": "x", "email": "a@b.co", "message": ""
        })
        assert r.status_code == 422


# ---------- Resources (static seed) ----------
class TestResources:
    def test_list_all(self, client):
        r = client.get(f"{API}/resources")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) == 6  # exactly 6 seed items
        for item in data:
            assert {"id", "title", "category", "type", "description"} <= set(item.keys())

    def test_filter_article(self, client):
        r = client.get(f"{API}/resources", params={"category": "Article"})
        assert r.status_code == 200
        data = r.json()
        assert len(data) >= 1
        assert all(i["category"].lower() == "article" for i in data)

    def test_filter_all_keyword(self, client):
        r = client.get(f"{API}/resources", params={"category": "all"})
        assert r.status_code == 200
        assert len(r.json()) == 6

    def test_filter_unknown(self, client):
        r = client.get(f"{API}/resources", params={"category": "NonExistent"})
        assert r.status_code == 200
        assert r.json() == []


# ---------- Admin Auth ----------
class TestAdminAuth:
    def test_login_correct_password(self, client):
        r = client.post(f"{API}/admin/login", json={"password": ADMIN_PASSWORD})
        assert r.status_code == 200
        data = r.json()
        assert data.get("ok") is True
        assert "token" in data and isinstance(data["token"], str) and len(data["token"]) > 20
        # cookie should be set
        assert "wamc_admin" in r.cookies or any(
            "wamc_admin" in c for c in r.headers.get("set-cookie", "").split(",")
        )

    def test_login_wrong_password_401(self, client):
        r = client.post(f"{API}/admin/login", json={"password": "wrong-pass-xyz"})
        assert r.status_code == 401

    def test_login_empty_password_422(self, client):
        r = client.post(f"{API}/admin/login", json={"password": ""})
        assert r.status_code == 422

    def test_me_with_token_ok(self, auth_client):
        r = auth_client.get(f"{API}/admin/me")
        assert r.status_code == 200
        data = r.json()
        assert data.get("ok") is True
        assert data.get("role") == "admin"

    def test_me_without_token_401(self, client):
        r = requests.get(f"{API}/admin/me")
        assert r.status_code == 401

    def test_me_with_bad_token_401(self):
        r = requests.get(f"{API}/admin/me", headers={"Authorization": "Bearer not.a.jwt"})
        assert r.status_code == 401


# ---------- Admin Data ----------
class TestAdminData:
    def test_leads_list_requires_auth(self, client):
        r = requests.get(f"{API}/admin/leads")
        assert r.status_code == 401

    def test_contacts_list_requires_auth(self, client):
        r = requests.get(f"{API}/admin/contacts")
        assert r.status_code == 401

    def test_stats_requires_auth(self):
        r = requests.get(f"{API}/admin/stats")
        assert r.status_code == 401

    def test_admin_stats_structure(self, auth_client):
        r = auth_client.get(f"{API}/admin/stats")
        assert r.status_code == 200
        data = r.json()
        assert "leads_total" in data and isinstance(data["leads_total"], int)
        assert "contacts_total" in data and isinstance(data["contacts_total"], int)
        assert "leads_by_locale" in data
        assert "en" in data["leads_by_locale"] and "fr" in data["leads_by_locale"]
        # After creating test rows, totals should be >= 1
        assert data["leads_total"] >= 1
        assert data["contacts_total"] >= 1


# ---------- Cleanup ----------
class TestZCleanup:
    """Delete TEST rows from Supabase to keep DB clean (runs last due to Z prefix)."""

    def test_cleanup_test_data(self):
        import asyncio
        import sys
        sys.path.insert(0, "/app/backend")
        from database import AsyncSessionLocal
        from models import Lead, ContactMessage
        from sqlalchemy import delete

        async def _cleanup():
            async with AsyncSessionLocal() as s:
                await s.execute(delete(Lead).where(Lead.email.like("test_%@example.com")))
                await s.execute(delete(ContactMessage).where(ContactMessage.email.like("test_%@example.com")))
                await s.commit()

        try:
            asyncio.run(_cleanup())
        except Exception as e:
            pytest.skip(f"Cleanup skipped: {e}")
