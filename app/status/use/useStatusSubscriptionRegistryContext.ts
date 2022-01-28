import { useContext } from 'react'

import StatusSubscriptionRegistry from '@app/status/registries/StatusSubscriptionRegistry'

import StatusSubscriptionRegistryContext from '@app/status/contexts/StatusSubscriptionRegistryContext'

const useStatusSubscriptionRegistryContext = (): StatusSubscriptionRegistry => {
  return useContext(StatusSubscriptionRegistryContext)
}

export default useStatusSubscriptionRegistryContext
