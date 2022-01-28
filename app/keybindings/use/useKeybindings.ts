import { useEffect } from 'react'

import * as R from 'ramda'

import Handler from '@app/common/types/Handler'

import useKeybindingScopeContext from '@app/keybindings/use/useKeybindingScopeContext'

import KeybindingsManager, { KeybindingHandler } from '@app/keybindings/managers/KeybindingsManager'

import definitions from '@app/keybindings/definitions'

export type KeybindingHandlers = {
  [name in keyof typeof definitions]?: KeybindingHandler
}

export const conformHandler = (handler: KeybindingHandler): Handler<KeyboardEvent> => {
  return (event) => {
    event.preventDefault()
    event.stopPropagation()

    return handler(event)
  }
}

interface Options {
  disable?: boolean,
  handlers: KeybindingHandlers
}

const useKeybindings = ({
  disable = false,
  handlers = {}
}: Options) => {
  const scope = useKeybindingScopeContext()

  useEffect(() => {
    if (disable) {
      return
    }

    const addKeybinding = (handler: KeybindingHandler, keybindingId: keyof KeybindingHandlers) => {
      const keybinding = definitions[keybindingId]

      if (R.isNil(keybinding)) {
        return null
      }

      return KeybindingsManager.add({
        scope,
        ...keybinding
      }, conformHandler(handler))
    }

    const scopedKeybindings = R.reject(
      R.isNil,
      R.values(
        R.mapObjIndexed(addKeybinding, handlers)
      )
    )

    return () => {
      R.forEach((scopedKeybinding) => {
        KeybindingsManager.remove(scopedKeybinding)
      }, scopedKeybindings)
    }
  }, [disable, handlers, scope])
}

export default useKeybindings
