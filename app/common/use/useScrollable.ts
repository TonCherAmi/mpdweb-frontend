import React, { useRef, useMemo } from 'react'

interface Scrollable {
  scrollUp: (behavior?: ScrollBehavior) => void
  scrollDown: (behavior?: ScrollBehavior) => void
  scrollLeft: (behavior?: ScrollBehavior) => void
  scrollRight: (behavior?: ScrollBehavior) => void
}

const DEFAULT_SCROLL_BEHAVIOR: ScrollBehavior = 'smooth'

const useScrollable = <T extends HTMLElement>(): [React.RefObject<T>, Scrollable] => {
  const ref = useRef<T>(null)

  return useMemo(() => {
    const scrollTo = (scrollToOptions?: Partial<ScrollToOptions>) => {
      ref.current?.scrollTo({
        top: 0,
        left: 0,
        ...scrollToOptions
      })
    }

    const scrollBase = (behavior: ScrollBehavior = DEFAULT_SCROLL_BEHAVIOR) => {
      scrollTo({ behavior })
    }

    const scrollDown = (behavior: ScrollBehavior = DEFAULT_SCROLL_BEHAVIOR) => {
      scrollTo({
        behavior,
        top: ref.current?.scrollHeight
      })
    }

    const scrollRight = (behavior: ScrollBehavior = DEFAULT_SCROLL_BEHAVIOR) => {
      scrollTo({
        behavior,
        left: ref.current?.scrollWidth
      })
    }

    return [ref, {
      scrollDown,
      scrollRight,
      scrollUp: scrollBase,
      scrollLeft: scrollBase
    }]
  }, [])
}

export default useScrollable
