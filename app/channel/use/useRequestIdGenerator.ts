import { useRef, useCallback } from 'react'

const useRequestIdGenerator = () => {
  const requestIdRef = useRef(0)

  return useCallback(() => {
    return String(requestIdRef.current++)
  }, [])
}

export default useRequestIdGenerator
