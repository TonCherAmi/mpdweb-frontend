import { createContext } from 'react'

import StatusSubscriptionRegistry from '@app/status/registries/StatusSubscriptionRegistry'

const StatusSubscriptionRegistryContext = createContext(
  new StatusSubscriptionRegistry()
)

export default StatusSubscriptionRegistryContext
