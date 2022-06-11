import { useEffect } from 'react'

import * as R from 'ramda'

import Handler from '@app/common/types/Handler'
import { KeybindingHandler } from '@app/keybindings/contexts/KeybindingsContext'

import useKeybindingsContext from '@app/keybindings/use/useKeybindingsContext'

import definitions from '@app/keybindings/definitions'

export type KeybindingHandlers = {
  [name in keyof typeof definitions]?: KeybindingHandler
}

interface Options {
  disable?: boolean
}

const conformHandler = (handler: KeybindingHandler): Handler<KeyboardEvent> => {
  return (event) => {
    event.preventDefault()
    event.stopPropagation()

    return handler(event)
  }
}

const useKeybindings = (handlers: KeybindingHandlers, {
  disable = false,
}: Options = {}) => {
  const { add, remove } = useKeybindingsContext()

  useEffect(() => {
    if (disable) {
      return
    }

    const pairs = R.toPairs(handlers)

    pairs.forEach(([keybindingId, handler]) => {
      if (R.isNil(handler)) {
        return
      }

      add(definitions[keybindingId], conformHandler(handler))
    })

    return () => {
      pairs.forEach(([keybindingId]) => {
        remove(definitions[keybindingId])
      })
    }
  }, [disable, handlers, add, remove])
}

export default useKeybindings
