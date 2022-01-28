import Status from '@app/status/dto/Status'

import AbstractStompSubscriptionRegistry from '@app/common/registries/AbstractStompSubscriptionRegistry'

const STATUS_PATH = '/status'

class StatusSubscriptionRegistry extends AbstractStompSubscriptionRegistry<Status> {
  constructor() {
    super(STATUS_PATH)
  }
}

export default StatusSubscriptionRegistry
