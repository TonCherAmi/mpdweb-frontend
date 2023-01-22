import { createContext } from 'react'

import Status from '@app/status/data/Status'
import Fallible from '@app/common/types/Fallible'

const StatusContext = createContext<Nullable<Fallible<Status>>>(null)

export default StatusContext
