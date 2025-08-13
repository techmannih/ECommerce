// Determine backend URL and ensure "/api" prefix is included so requests
// reach the Express routes mounted under `/api` on the server.
const backendBase = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
const backend = backendBase.endsWith('/api') ? backendBase : `${backendBase}/api`;

export async function post(endpoint, data) {
  const response = await fetch(`${backend}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  console.log("POST request to:", `${backend}${endpoint}`, "with data:", data);
  const body = await response.json();
  return { ok: response.ok, body };
}
