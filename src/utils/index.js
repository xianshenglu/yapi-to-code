/**
 * @returns {string} apiId
 */
export function getApiId() {
  return window.location.pathname.split('/').slice(-1)[0]
}
