import Change from '@app/changes/types/Change'

import AbstractStompSubscriptionRegistry from '@app/common/registries/AbstractStompSubscriptionRegistry'

const CHANGES_PATH = '/changes'

class ChangesSubscriptionRegistry extends AbstractStompSubscriptionRegistry<Change[]> {
  constructor() {
    super(CHANGES_PATH)
  }
}

export default ChangesSubscriptionRegistry
