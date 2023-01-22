import { createContext } from 'react'

import Fallible from '@app/common/types/Fallible'
import QueueItem from '@app/queue/data/QueueItem'

const QueueContext = createContext<Nullable<Fallible<ReadonlyArray<QueueItem>>>>(null)

export default QueueContext
