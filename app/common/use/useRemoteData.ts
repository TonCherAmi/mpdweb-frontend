import { useRef, useState, useCallback } from 'react'

import Thunk from '@app/common/types/Thunk'

export type State = 'initial' | 'fetching' | 'success' | 'error'

export type Load <T> = (data: T) => void
export type Retrieve<T, R> = (data: T) => Promise<R>

export interface RemoteData<T, R> {
  data: Nullable<R>
  state: State
  load: Load<T>
  reset: Thunk
  cancel: Thunk
}

const useRemoteData = <T, R> (retrieve: Retrieve<T, R>): RemoteData<T, R> => {
  const isCanceledRef = useRef(false)

  const [data, setData] = useState<Nullable<R>>(null)
  const [state, setState] = useState<State>('initial')

  const load = useCallback((data: T) => {
    retrieve(data)
      .then((result) => {
        if (isCanceledRef.current) {
          isCanceledRef.current = false

          return
        }

        setState('success')

        setData(result)
      })
      .catch(() => {
        setState('error')
      })
  }, [retrieve])

  const reset = useCallback(() => {
    setData(null)
  }, [])

  const cancel = useCallback(() => {
    if (state === 'fetching') {
      isCanceledRef.current = true
    }
  }, [state])

  return {
    data,
    state,
    load,
    reset,
    cancel
  }
}

export default useRemoteData
