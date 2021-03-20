import * as R from 'ramda'

import Handler from '@app/common/types/Handler'

import StompSubscriptionManager from '@app/common/managers/StompSubscriptionManager'

class AbstractStompSubscriptionRegistry<T> {
  private handlers: Set<Handler<T>> = new Set()

  constructor(path: string) {
    StompSubscriptionManager.subscribe(path, this.entrypoint)
  }

  subscribe(handler: Handler<T>) {
    this.handlers.add(handler)
  }

  unsubscribe(handler: Handler<T>) {
    this.handlers.delete(handler)
  }

  private entrypoint: Handler<T> = (changes: T) => {
    this.handlers.forEach(R.applyTo(changes))
  }
}

export default AbstractStompSubscriptionRegistry
