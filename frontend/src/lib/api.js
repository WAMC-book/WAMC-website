import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const http = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

function authHeaders() {
  try {
    const token = localStorage.getItem("wamc_admin_token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}

export async function submitLead(data) {
  const res = await http.post("/leads", data);
  return res.data;
}

export async function submitContact(data) {
  const res = await http.post("/contact", data);
  return res.data;
}

export async function fetchResources(category) {
  const params = category && category !== "All" ? { category } : {};
  const res = await http.get("/resources", { params });
  return res.data;
}

// Admin
export async function adminLogin(password) {
  const res = await http.post("/admin/login", { password });
  if (res.data?.token) {
    try { localStorage.setItem("wamc_admin_token", res.data.token); } catch {}
  }
  return res.data;
}

export async function adminLogout() {
  try { localStorage.removeItem("wamc_admin_token"); } catch {}
  try { await http.post("/admin/logout"); } catch {}
  return true;
}

export async function adminMe() {
  const res = await http.get("/admin/me", { headers: authHeaders() });
  return res.data;
}

export async function adminLeads() {
  const res = await http.get("/admin/leads", { headers: authHeaders() });
  return res.data;
}

export async function adminContacts() {
  const res = await http.get("/admin/contacts", { headers: authHeaders() });
  return res.data;
}

export async function adminStats() {
  const res = await http.get("/admin/stats", { headers: authHeaders() });
  return res.data;
}
