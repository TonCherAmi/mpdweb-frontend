import { createContext } from 'react'

import Status from '@app/status/dto/Status'

import { INITIAL_STATUS } from '@app/status/utils/initial'

const StatusContext = createContext<Status>(INITIAL_STATUS)

export default StatusContext
