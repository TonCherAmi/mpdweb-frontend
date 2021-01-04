export const withCancellableDelay = (
  action: (...data: any[]) => void,
  delay: number
): [(...data: any[]) => void, () => void] => {
  let timeoutId: number

  const handleAction = (...data: any[]) => {
    timeoutId = window.setTimeout(() => {
      action?.(...data)

      timeoutId = -1
    }, delay)
  }

  const handleCancellation = () => {
    if (timeoutId !== -1) {
      window.clearTimeout(timeoutId)
    }
  }

  return [handleAction, handleCancellation]
}
