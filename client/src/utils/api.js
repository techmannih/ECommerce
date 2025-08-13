// Determine backend URL and ensure "/api" prefix is included so requests
// reach the Express routes mounted under `/api` on the server. Also trim
// trailing slashes to avoid generating double slashes in the final URL.
const rawBackend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
const backendBase = rawBackend.replace(/\/+$/, '');
export const backend = backendBase.endsWith('/api') ? backendBase : `${backendBase}/api`;

async function request(method, endpoint, data) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };

  if (data !== undefined) {
    options.body = JSON.stringify(data);
  }

  console.log(`${method} request to:`, `${backend}${endpoint}`, data ? 'with data:' : '', data || '');

  const response = await fetch(`${backend}${endpoint}`, options);

  let body;
  try {
    body = await response.json();
  } catch (err) {
    body = { message: await response.text() };
  }
  return { ok: response.ok, body };
}

export const get = (endpoint) => request('GET', endpoint);
export const post = (endpoint, data) => request('POST', endpoint, data);
export const put = (endpoint, data) => request('PUT', endpoint, data);
export const del = (endpoint, data) => request('DELETE', endpoint, data);
