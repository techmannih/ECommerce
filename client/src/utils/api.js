export async function post(endpoint, data) {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  const body = await response.json();
  return { ok: response.ok, body };
}
