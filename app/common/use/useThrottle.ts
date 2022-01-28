import { useRef, useEffect } from 'react'

type TimeoutId = ReturnType<typeof setTimeout>

const useThrottle = <A extends Array<unknown>, R> (
  fn: (...args: A) => R,
  wait: number
): (...args: A) => Nullable<R> => {
  const isOkToCallRef = useRef(true)

  const timeoutRef = useRef<Nullable<TimeoutId>>(null)

  useEffect(() => {
    return () => {
      if (!R.isNil(timeoutRef.current)) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (...args: A): Nullable<R> => {
    if (!isOkToCallRef.current) {
      return null
    }

    isOkToCallRef.current = false

    timeoutRef.current = setTimeout(() => {
      isOkToCallRef.current = true
    }, wait)

    return fn(...args)
  }
}

export default useThrottle
