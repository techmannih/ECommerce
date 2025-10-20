const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api';

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
