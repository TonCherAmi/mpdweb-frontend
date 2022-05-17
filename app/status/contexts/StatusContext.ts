import { createContext } from 'react'

import Status from '@app/status/dto/Status'

const StatusContext = createContext<Nullable<Status>>(null)

export default StatusContext
