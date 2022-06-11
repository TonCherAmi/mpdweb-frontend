import * as Stomp from '@stomp/stompjs'

import Handler from '@app/common/types/Handler'

const CONNECT_PATH = '/api/ws/connect'

class StompSubscriptionManager {
  private stompClient: Stomp.Client

  constructor() {
    this.stompClient = new Stomp.Client({
      brokerURL: StompSubscriptionManager.makeBrokerUrl(CONNECT_PATH),
    })

    this.stompClient.activate()
  }

  subscribe<T>(destination: string, handler: Handler<T>) {
    const handle = this.makeHandler(handler)

    if (this.stompClient.connected) {
      this.stompClient.subscribe(destination, handle)

      return
    }

    const onConnect = this.stompClient.onConnect

    this.stompClient.onConnect = (receipt: Stomp.Frame) => {
      onConnect?.(receipt)

      this.stompClient.subscribe(destination, handle)
    }
  }

  private makeHandler<T>(responseHandler: Handler<T>): (message: Stomp.Message) => void {
    return (message: Stomp.Message) => {
      const response = JSON.parse(message.body)

      responseHandler(response)
    }
  }

  private static makeBrokerUrl(path: string): string {
    const url = new URL(path, window.location.href)

    url.protocol = url.protocol.replace('http', 'ws')

    return url.href
  }
}

export default StompSubscriptionManager
