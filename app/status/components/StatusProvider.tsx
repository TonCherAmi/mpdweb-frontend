import React, { useState, useEffect, useCallback } from 'react'

import * as R from 'ramda'

import Status from '@app/status/data/Status'
import Change from '@app/changes/types/Change'
import Handler from '@app/common/types/Handler'

import StatusContext from '@app/status/contexts/StatusContext'

import useStatusSubscriptionRegistryContext from '@app/status/use/useStatusSubscriptionRegistryContext'
import useChangesSubscriptionRegistryContext from '@app/changes/use/useChangesSubscriptionRegistryContext'

import StatusApi from '@app/status/api'

const StatusProvider = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = useState<Nullable<Status>>(null)

  const statusSubscriptionRegistry = useStatusSubscriptionRegistryContext()
  const changesSubscriptionRegistry = useChangesSubscriptionRegistryContext()

  const load = useCallback(() => {
    StatusApi.get()
      .then(setStatus)
      .catch(() => {
        setStatus(null)
      })
  }, [])

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    const handler: Handler<Status> = (status) => {
      setStatus(status)
    }

    statusSubscriptionRegistry.subscribe(handler)

    return () => {
      statusSubscriptionRegistry.unsubscribe(handler)
    }
  }, [statusSubscriptionRegistry])

  useEffect(() => {
    const handler: Handler<ReadonlyArray<Change>> = (changes) => {
      const shouldUpdateStatus = !R.isEmpty(
        R.intersection(changes, ['mixer', 'player', 'playlist', 'options'])
      )

      if (!shouldUpdateStatus) {
        return
      }

      load()
    }

    changesSubscriptionRegistry.subscribe(handler)

    return () => {
      changesSubscriptionRegistry.unsubscribe(handler)
    }
  }, [changesSubscriptionRegistry, load])

  if (R.isNil(status)) {
    return null
  }

  return (
    <StatusContext.Provider value={status}>
      {children}
    </StatusContext.Provider>
  )
}

export default StatusProvider
