export const timeout = (ms: number) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(`Timed out after ${ms} ms`)
    }, ms)
  })
}
