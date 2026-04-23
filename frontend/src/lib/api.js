import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const http = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

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
