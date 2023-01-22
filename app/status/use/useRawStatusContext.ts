import { useContext } from 'react'

import Status from '@app/status/data/Status'
import Fallible from '@app/common/types/Fallible'

import StatusContext from '@app/status/contexts/StatusContext'

const useRawStatusContext = (): Nullable<Fallible<Status>> => {
  return useContext(StatusContext)
}

export default useRawStatusContext
