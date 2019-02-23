function getHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: '0',
  };
}

export default (endpoint, method, body, callbacks = {}) => {
  const { onError, onRequest, onSuccess } = callbacks;
  const payload = { endpoint, method, body };

  if (onRequest) onRequest(payload);

  // eslint-disable-next-line no-undef
  return fetch(endpoint, { method, headers: getHeaders(), body: JSON.stringify(body), mode: 'cors' })
    .then(response => response.json())
    .then((json) => { if (onSuccess) onSuccess(json, payload); })
    .catch(e => onError && onError(e));
};
