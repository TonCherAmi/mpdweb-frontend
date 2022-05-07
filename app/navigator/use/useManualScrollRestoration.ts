import { useEffect } from 'react'

const useManualScrollRestoration = () => {
  useEffect(() => {
    history.scrollRestoration = 'manual'
  }, [])
}

export default useManualScrollRestoration
