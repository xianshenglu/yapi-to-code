export function getApiId(): string {
  return window.location.pathname.split('/').slice(-1)[0]
}
