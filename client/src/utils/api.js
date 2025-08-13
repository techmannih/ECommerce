// Determine backend URL and ensure "/api" prefix is included so requests
// reach the Express routes mounted under `/api` on the server. Also trim
// trailing slashes to avoid generating double slashes in the final URL.
const rawBackend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
const backendBase = rawBackend.replace(/\/+$/, '');
const backend = backendBase.endsWith('/api') ? backendBase : `${backendBase}/api`;

export async function post(endpoint, data) {
  const response = await fetch(`${backend}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  console.log("POST request to:", `${backend}${endpoint}`, "with data:", data);
  let body;
  try {
    body = await response.json();
  } catch (err) {
    body = { message: await response.text() };
  }
  return { ok: response.ok, body };
}
