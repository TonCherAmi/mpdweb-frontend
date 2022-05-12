import { useContext } from 'react'

import Status from '@app/status/dto/Status'

import StatusContext from '@app/status/contexts/StatusContext'

const useStatusContext = (): Status => {
  return useContext(StatusContext)
}

export default useStatusContext
