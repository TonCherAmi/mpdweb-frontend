import { useRef, useEffect, useMemo } from 'react'

import * as R from 'ramda'

import Thunk from '@app/common/types/Thunk'
import TimeoutId from '@app/common/types/TimeoutId'

const useDebounce = <A extends Array<unknown>, R>(
  fn: (...args: A) => R,
  wait: number
): [(...args: A) => void, Thunk] => {
  const timeoutRef = useRef<Nullable<TimeoutId>>(null)

  useEffect(() => {
    return () => {
      if (!R.isNil(timeoutRef.current)) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return useMemo(() => {
    const cancel = () => {
      if (!R.isNil(timeoutRef.current)) {
        clearTimeout(timeoutRef.current)
      }
    }

    const debounce = (...args: A) => {
      cancel()

      timeoutRef.current = setTimeout(() => {
        fn(...args)
      }, wait)
    }

    return [debounce, cancel]
  }, [fn, wait])
}

export default useDebounce
