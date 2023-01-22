import { useEffect, useRef, useCallback, useMemo } from 'react'

import * as R from 'ramda'

import Handler from '@app/common/types/Handler'

import { connect, Subscriber, Connection } from '@app/channel/ws'

import useRequestIdGenerator from '@app/channel/use/useRequestIdGenerator'

import { timeout } from '@app/channel/utils/timeout'
import { makeWsUrl } from '@app/channel/utils/url'

interface StatusEvent {
  type: 'status'
  data: 'open' | 'closed'
}

interface UpdateEvent {
  type: 'update'
  data: unknown
}

export type Event = StatusEvent | UpdateEvent

interface Response {
  type: 'response'
  id: number
  content: unknown
}

interface Update {
  type: 'update'
  content: unknown
}

type In = Response | Update

const useConnectionWrapper = (url: string): Omit<Connection, 'disconnect'> => {
  const connectionRef = useRef<Nullable<Connection>>(null)

  useEffect(() => {
    connectionRef.current = connect(url)

    return () => {
      connectionRef.current?.disconnect?.()
    }
  }, [url])

  return useMemo(() => ({
    send: data => connectionRef.current?.send?.(data),
    subscribe: fn => connectionRef.current?.subscribe?.(fn),
    unsubscribe: fn => connectionRef.current?.unsubscribe?.(fn),
  }), [])
}

const REQUEST_TIMEOUT_MS = 5000

const useConnection = (onEvent: Handler<Event>) => {
  const {
    send,
    subscribe,
    unsubscribe,
  } = useConnectionWrapper(makeWsUrl('/api/ws'))

  const generateId = useRequestIdGenerator()

  const requestMapRef = useRef(new Map())

  const handleMessage: Subscriber = useCallback((event) => {
    switch (event.type) {
      case 'status': {
        onEvent(event)

        return
      }

      case 'message': {
        const incoming = JSON.parse(event.data) as In

        switch (incoming.type) {
          case 'update': {
            onEvent({
              type: 'update',
              data: incoming.content,
            })

            break
          }

          case 'response': {
            const request = requestMapRef.current.get(incoming.id)

            requestMapRef.current.delete(incoming.id)

            if (R.isNil(request)) {
              console.error(`Received response to unknown request with id '${incoming.id}'`)

              return
            }

            request.resolve(incoming.content)

            break
          }
        }
      }
    }
  }, [onEvent])

  useEffect(() => {
    subscribe(handleMessage)

    return () => {
      unsubscribe(handleMessage)
    }
  }, [handleMessage, subscribe, unsubscribe])

  return useCallback((content: unknown) => {
    const request = new Promise((resolve) => {
      const id = generateId()

      requestMapRef.current.set(id, { resolve })

      const json = JSON.stringify({
        id,
        content,
      })

      send(json)
    })

    return Promise.race([
      request,
      timeout(REQUEST_TIMEOUT_MS),
    ])
  }, [generateId, send])
}

export default useConnection
