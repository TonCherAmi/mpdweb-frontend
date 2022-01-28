import { createContext } from 'react'

import ChangesSubscriptionRegistry from '@app/changes/registries/ChangesSubscriptionRegistry'

const ChangesSubscriptionRegistryContext = createContext(
  new ChangesSubscriptionRegistry()
)

export default ChangesSubscriptionRegistryContext
