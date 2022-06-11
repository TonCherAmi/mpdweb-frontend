import { useRef, useState, useCallback } from 'react'

import Thunk from '@app/common/types/Thunk'

export type State = 'initial' | 'fetching' | 'success' | 'error'

export type Load<T extends ReadonlyArray<unknown>> = (...data: T) => void
export type Retrieve<R, T extends ReadonlyArray<unknown>> = (...data: T) => Promise<R>

export interface RemoteData<R, T extends ReadonlyArray<unknown>> {
  data: Nullable<R>
  state: State
  load: Load<T>
  reset: Thunk
  cancel: Thunk
}

const useRemoteData = <R, T extends ReadonlyArray<unknown>> (retrieve: Retrieve<R, T>): RemoteData<R, T> => {
  const isCanceledRef = useRef(false)

  const [data, setData] = useState<Nullable<R>>(null)
  const [state, setState] = useState<State>('initial')

  const load: Load<T> = useCallback((...data) => {
    retrieve(...data)
      .then((result) => {
        if (isCanceledRef.current) {
          isCanceledRef.current = false

          return
        }

        setData(result)
        setState('success')
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
    cancel,
  }
}

export default useRemoteData
