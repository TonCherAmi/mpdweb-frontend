export const makeWsUrl = (path: string): string => {
  const url = new URL(path, window.location.href)

  url.protocol = url.protocol.replace('https', 'wss')
  url.protocol = url.protocol.replace('http', 'ws')

  return url.href
}
