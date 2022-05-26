import { useEffect } from 'react'

import Change from '@app/changes/types/Change'
import Handler from '@app/common/types/Handler'

import useChangesSubscriptionRegistryContext from '@app/changes/use/useChangesSubscriptionRegistryContext'

const useChanges = (handler: Handler<ReadonlyArray<Change>>) => {
  const changesSubscriptionRegistry = useChangesSubscriptionRegistryContext()

  useEffect(() => {
    changesSubscriptionRegistry.subscribe(handler)

    return () => {
      changesSubscriptionRegistry.unsubscribe(handler)
    }
  }, [handler, changesSubscriptionRegistry])
}

export default useChanges
