import Handler from '@app/common/handlers/Handler'

import Status from '@app/status/dto/Status'

import StompSubscriptionFactory from '@app/common/factories/StompSubscriptionFactory'

const STATUS_PATH = '/status'

class StatusSubscriber {
  constructor(handler: Handler<Status>) {
    StompSubscriptionFactory.subscribe(STATUS_PATH, handler)
  }
}

export default StatusSubscriber
