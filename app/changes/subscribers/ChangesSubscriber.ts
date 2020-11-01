import Change from '@app/changes/dto/enums/Change'
import Handler from '@app/common/handlers/Handler'

import StompSubscriptionFactory from '@app/common/factories/StompSubscriptionFactory'

const CHANGES_PATH = '/changes'

class ChangesSubscriber {
  constructor(handler: Handler<Change[]>) {
    StompSubscriptionFactory.subscribe(CHANGES_PATH, handler)
  }
}

export default ChangesSubscriber
