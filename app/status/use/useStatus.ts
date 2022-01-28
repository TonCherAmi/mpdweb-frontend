import { useState, useEffect } from 'react'

import * as R from 'ramda'

import Status from '@app/status/dto/Status'
import Change from '@app/changes/dto/enums/Change'
import Handler from '@app/common/types/Handler'

import useStatusSubscriptionRegistryContext from '@app/status/use/useStatusSubscriptionRegistryContext'
import useChangesSubscriptionRegistryContext from '@app/changes/use/useChangesSubscriptionRegistryContext'

import StatusApi from '@app/status/api'

const useStatus = () => {
  const [status, setStatus] = useState<Nullable<Status>>(null)

  const statusSubscriptionRegistry = useStatusSubscriptionRegistryContext()
  const changesSubscriptionRegistry = useChangesSubscriptionRegistryContext()

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

      StatusApi.get()
        .then(setStatus)
        .catch(() => {
          setStatus(null)
        })
    }

    changesSubscriptionRegistry.subscribe(handler)

    return () => {
      changesSubscriptionRegistry.unsubscribe(handler)
    }
  }, [changesSubscriptionRegistry])

  return status
}

export default useStatus
