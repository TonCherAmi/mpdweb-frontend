import { useContext, ContextType } from 'react'

import QueueContext from '@app/queue/contexts/QueueContext'

const useQueueContext = (): ContextType<typeof QueueContext> => {
  return useContext(QueueContext)
}

export default useQueueContext
