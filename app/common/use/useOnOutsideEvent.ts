import React, { useEffect } from 'react'

import * as R from 'ramda'

import Handler from '@app/common/types/Handler'

type EventToHandler = {
  [k in keyof DocumentEventMap]?: Handler<Event>
}

const useOnOutsideEvent = <E extends Element> (ref: React.RefObject<E>, mappings: EventToHandler) => {
  useEffect(() => {
    const makeHandler = (handler: Handler<Event>) => (event: Event) => {
      if (R.isNil(ref.current)) {
        return
      }

      if (event.target instanceof Node && !ref.current.contains(event.target)) {
        handler(event)
      }
    }

    const mapped = Object.entries(mappings).map(([key, value]) => (
      [key, makeHandler(value)] as const
    ))

    mapped.forEach(([key, value]) => {
      document.addEventListener(key, value, true)
    })

    return () => {
      mapped.forEach(([key, value]) => {
        document.removeEventListener(key, value, true)
      })
    }
  }, [ref, mappings])
}

export default useOnOutsideEvent
