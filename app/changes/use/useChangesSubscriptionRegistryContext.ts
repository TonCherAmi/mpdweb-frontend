import { useContext } from 'react'

import ChangesSubscriptionRegistry from '@app/changes/registries/ChangesSubscriptionRegistry'

import ChangesSubscriptionRegistryContext from '@app/changes/contexts/ChangesSubscriptionRegistryContext'

const useChangesSubscriptionRegistryContext = (): ChangesSubscriptionRegistry => {
  return useContext(ChangesSubscriptionRegistryContext)
}

export default useChangesSubscriptionRegistryContext
