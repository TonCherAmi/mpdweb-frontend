import { createContext } from 'react'

import QueueItem from '@app/queue/data/QueueItem'

const QueueContext = createContext<ReadonlyArray<QueueItem>>([])

export default QueueContext
