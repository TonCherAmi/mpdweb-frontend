import React, { useState, useEffect, useCallback } from 'react'

import * as R from 'ramda'

import Status from '@app/status/dto/Status'
import Change from '@app/changes/dto/enums/Change'
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
        R.intersection(changes, [Change.MIXER, Change.PLAYER])
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

  return (
    <StatusContext.Provider value={status}>
      {children}
    </StatusContext.Provider>
  )
}

export default StatusProvider