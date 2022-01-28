import { useRef } from 'react'

import * as R from 'ramda'

import Thunk from '@app/common/types/Thunk'

const useStatic = <T> (initialValue: T | Thunk<T>): T => {
  const ref = useRef<Nullable<T>>(null)

  if (R.isNil(ref.current)) {
    if (initialValue instanceof Function) {
      ref.current = initialValue()
    } else {
      ref.current = initialValue
    }
  }

  return ref.current
}

export default useStatic
