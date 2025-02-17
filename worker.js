addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // Check if the session cookie exists
  const cookie = request.headers.get('Cookie') || '';
  let response = await fetch(request);

  if (!cookie.includes('cf_session_id=')) {
    // Generate a secure session ID
    const newSessionId = crypto.randomUUID();
    // Clone response to modify headers
    response = new Response(response.body, response);
    // Set the cookie with security attributes
    response.headers.append('Set-Cookie', 
      `cf_session_id=${newSessionId}; Path=/; HttpOnly; Secure; SameSite=Lax`);
  }

  return response;
}
