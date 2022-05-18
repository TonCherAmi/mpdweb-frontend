import React, { useEffect } from 'react'

import Change from '@app/changes/types/Change'
import Handler from '@app/common/types/Handler'

import useRemoteList from '@app/common/use/useRemoteList'
import useChangesSubscriptionRegistryContext from '@app/changes/use/useChangesSubscriptionRegistryContext'

import QueueContext from '@app/queue/contexts/QueueContext'

import QueueApi from '@app/queue/api'

const QueueProvider = ({ children }: { children: React.ReactNode }) => {
  const { load, items } = useRemoteList(QueueApi.get)

  useEffect(() => {
    load()
  }, [load])

  const changesSubscriptionRegistry = useChangesSubscriptionRegistryContext()

  useEffect(() => {
    const handler: Handler<ReadonlyArray<Change>> = (changes) => {
      if (changes.includes('playlist')) {
        load()
      }
    }

    changesSubscriptionRegistry.subscribe(handler)

    return () => {
      changesSubscriptionRegistry.unsubscribe(handler)
    }
  }, [changesSubscriptionRegistry, load])

  return (
    <QueueContext.Provider value={items}>
      {children}
    </QueueContext.Provider>
  )
}

export default QueueProvider
