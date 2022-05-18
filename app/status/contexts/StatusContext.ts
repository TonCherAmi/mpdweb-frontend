import { createContext } from 'react'

import Status from '@app/status/data/Status'

const StatusContext = createContext<Nullable<Status>>(null)

export default StatusContext
