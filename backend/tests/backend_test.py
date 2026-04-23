"""Backend API tests for 'Who Are My Clients?' site."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    # Fallback to frontend .env file
    try:
        with open("/app/frontend/.env") as f:
            for line in f:
                if line.startswith("REACT_APP_BACKEND_URL="):
                    BASE_URL = line.split("=", 1)[1].strip().rstrip("/")
                    break
    except Exception:
        pass

API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---- Health ----
class TestHealth:
    def test_root(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"
        assert "Who Are My Clients" in data.get("message", "")


# ---- Leads ----
class TestLeads:
    def test_create_and_list_lead(self, client):
        payload = {
            "first_name": "TEST_Jane",
            "last_name": "Doe",
            "email": f"test_{uuid.uuid4().hex[:8]}@example.com",
            "role": "just-launched",
            "source": "chapter_download",
        }
        r = client.post(f"{API}/leads", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["first_name"] == payload["first_name"]
        assert data["email"] == payload["email"].lower()
        assert data["role"] == payload["role"]
        assert "id" in data and len(data["id"]) > 0
        assert "created_at" in data

        # GET listing verifies persistence
        r2 = client.get(f"{API}/leads")
        assert r2.status_code == 200
        leads = r2.json()
        assert any(l["id"] == data["id"] for l in leads)

    def test_lead_default_source(self, client):
        payload = {
            "first_name": "TEST_NoSource",
            "last_name": "User",
            "email": f"test_{uuid.uuid4().hex[:8]}@example.com",
            "role": "other",
        }
        r = client.post(f"{API}/leads", json=payload)
        assert r.status_code == 200
        assert r.json()["source"] == "chapter_download"

    def test_lead_invalid_email(self, client):
        payload = {
            "first_name": "Bad",
            "last_name": "Email",
            "email": "not-an-email",
            "role": "other",
        }
        r = client.post(f"{API}/leads", json=payload)
        assert r.status_code == 422

    def test_lead_missing_fields(self, client):
        r = client.post(f"{API}/leads", json={"email": "a@b.co"})
        assert r.status_code == 422


# ---- Contact ----
class TestContact:
    def test_create_and_list_contact(self, client):
        payload = {
            "name": "TEST_Contact",
            "email": f"test_{uuid.uuid4().hex[:8]}@example.com",
            "message": "Hello, this is a test message.",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"].lower()
        assert data["message"] == payload["message"]
        assert "id" in data

        r2 = client.get(f"{API}/contact")
        assert r2.status_code == 200
        contacts = r2.json()
        assert any(c["id"] == data["id"] for c in contacts)

    def test_contact_invalid_email(self, client):
        r = client.post(
            f"{API}/contact",
            json={"name": "x", "email": "not-email", "message": "hi"},
        )
        assert r.status_code == 422

    def test_contact_empty_message(self, client):
        r = client.post(
            f"{API}/contact",
            json={"name": "x", "email": "a@b.co", "message": ""},
        )
        assert r.status_code == 422


# ---- Resources ----
class TestResources:
    def test_list_all_resources(self, client):
        r = client.get(f"{API}/resources")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) >= 6
        for item in data:
            assert "id" in item
            assert "title" in item
            assert "category" in item
            assert "type" in item

    def test_filter_by_worksheet(self, client):
        r = client.get(f"{API}/resources", params={"category": "Worksheet"})
        assert r.status_code == 200
        data = r.json()
        assert len(data) >= 1
        assert all(item["category"].lower() == "worksheet" for item in data)

    def test_filter_category_all(self, client):
        r = client.get(f"{API}/resources", params={"category": "all"})
        assert r.status_code == 200
        assert len(r.json()) >= 6

    def test_filter_unknown_category(self, client):
        r = client.get(f"{API}/resources", params={"category": "NonExistent"})
        assert r.status_code == 200
        assert r.json() == []
