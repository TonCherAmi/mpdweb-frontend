import React, { useEffect } from 'react'

import * as R from 'ramda'

import Handler from '@app/common/types/Handler'

interface EventToHandler {
  click: (this: Document, event: DocumentEventMap['click']) => unknown
  scroll: (this: Document, event: DocumentEventMap['scroll']) => unknown
}

const useOnOutsideEvent = <E extends Element> (ref: React.RefObject<E>, mappings: EventToHandler) => {
  useEffect(() => {
    const makeHandler = <T extends Event> (handler: Handler<T>) => (event: T) => {
      if (R.isNil(ref.current)) {
        return
      }

      if (event.target instanceof Node && !ref.current.contains(event.target)) {
        handler(event)
      }
    }

    const handleClick = makeHandler(mappings.click)
    const handleScroll = makeHandler(mappings.scroll)

    document.addEventListener('click', handleClick, true)
    document.addEventListener('scroll', handleScroll, true)

    return () => {
      document.removeEventListener('click', handleClick, true)
      document.removeEventListener('scroll', handleScroll, true)
    }
  }, [ref, mappings])
}

export default useOnOutsideEvent
