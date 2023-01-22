import { createContext } from 'react'

import Thunk from '@app/common/types/Thunk'

const noop = () => {
  throw Error('VolumeContext provider required')
}

const VolumeContext = createContext<{
  set: (volume: number) => void
  inc: Thunk
  dec: Thunk
  value: number
}>({ set: noop, inc: noop, dec: noop, value: 0 })

export default VolumeContext
