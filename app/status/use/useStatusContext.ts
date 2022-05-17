import { useContext } from 'react'

import * as R from 'ramda'

import Status from '@app/status/dto/Status'

import StatusContext from '@app/status/contexts/StatusContext'

const useStatusContext = (): Status => {
  const status = useContext(StatusContext)

  if (R.isNil(status)) {
    throw Error('StatusContext provider required')
  }

  return status
}

export default useStatusContext
