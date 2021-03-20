export const withCancellableDelay = <T> (
  action: Nullable<(...data: T[]) => void>,
  delay: number
): [(...data: T[]) => void, () => void] => {
  let timeoutId: number

  const handleAction = (...data: T[]) => {
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
