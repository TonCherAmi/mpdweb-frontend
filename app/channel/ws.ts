import * as R from 'ramda'

const RECONNECT_TIMEOUT_MS = 2000

interface StatusEvent {
  type: 'status',
  data: 'open' | 'closed',
}

interface MessageEvent {
  type: 'message',
  data: string,
}

type Event = StatusEvent | MessageEvent

export type Subscriber = (message: Event) => void

export interface Connection {
  send: (data: string) => void
  subscribe: (fn: Subscriber) => void
  unsubscribe: (fn: Subscriber) => void
  disconnect: () => void
}

export const connect = (url: string): Connection => {
  const subscribers = new Set<Subscriber>()

  let state: 'open' | 'closed' = 'closed'

  const notify = (event: Event) => {
    subscribers.forEach(fn => fn(event))
  }

  const create = () => {
    const result = new WebSocket(url)

    result.addEventListener('open', () => {
      state = 'open'

      notify({ type: 'status', data: 'open' })
    })

    result.addEventListener('close', () => {
      state = 'closed'

      console.error(
        `WebSocket connection closed, will attempt to reconnect in ${RECONNECT_TIMEOUT_MS / 1000} seconds`
      )

      notify({ type: 'status', data: 'closed' })

      setTimeout(() => {
        ws.close()

        ws = create()
      }, RECONNECT_TIMEOUT_MS)
    })

    result.addEventListener('message', ({ data }) => {
      if (!R.is(String, data)) {
        console.warn(`Expected string data but got ${data?.constructor?.name}`)

        return
      }

      notify({ data, type: 'message' })
    })

    return result
  }

  let ws = create()

  return {
    send: (data: string) => {
      if (state !== 'open') {
        throw Error('attempted to send via closed connection')
      }

      ws.send(data)
    },
    subscribe: (fn: Subscriber) => {
      subscribers.add(fn)
    },
    unsubscribe: (fn: Subscriber) => {
      subscribers.delete(fn)
    },
    disconnect: () => {
      ws.close()
    },
  }
}
