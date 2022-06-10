import React, { useEffect, useCallback, useRef, useMemo } from 'react'

import * as R from 'ramda'

import Handler from '@app/common/types/Handler'
import TimeoutId from '@app/common/types/TimeoutId'

import KeybindingsContext, {
  KeybindingTrigger,
  CompoundKeybindingTrigger
} from '@app/keybindings/contexts/KeybindingsContext'

import {
  doesSimpleTriggerMatch,
  isCompoundKeybindingTrigger,
  isKeyboardEventTargetTextInputElement
} from './utils'

export type KeybindingHandler = Handler<KeyboardEvent>

export interface Keybinding {
  isRepeatable: boolean
  triggers: ReadonlyArray<KeybindingTrigger>
}

const EVENT_TYPE = 'keydown'

const KeybindingsProvider = ({ children }: { children: React.ReactNode }) => {
  const currentCompoundTriggerStateRef = useRef<Nullable<{
    index: number
    trigger: CompoundKeybindingTrigger
    timeoutId: TimeoutId
  }>>(null)

  const keybindingToHandlerRef = useRef(new Map<Keybinding, KeybindingHandler>())

  const handleEvent: KeybindingHandler = useCallback((event) => {
    if (isKeyboardEventTargetTextInputElement(event)) {
      return
    }

    const findMatchingTrigger = (keybinding: Keybinding): Nullable<KeybindingTrigger> => {
      return R.find(
        (trigger): boolean => {
          const simpleTrigger = isCompoundKeybindingTrigger(trigger)
            ? trigger.sequence[currentCompoundTriggerStateRef.current?.index ?? 0]
            : trigger

          return doesSimpleTriggerMatch(simpleTrigger, event)
        },
        keybinding.triggers
      )
    }

    const matchingKeybindingToTrigger: Nullable<[Keybinding, KeybindingTrigger]> = Array.from(keybindingToHandlerRef.current.keys())
      .filter(({ isRepeatable }) => !event.repeat || (event.repeat && isRepeatable))
      .map((keybinding): [Keybinding, Nullable<KeybindingTrigger>] => [keybinding, findMatchingTrigger(keybinding)])
      .find((keybindingToTrigger): keybindingToTrigger is [Keybinding, KeybindingTrigger] => !R.isNil(keybindingToTrigger[1]))

    if (R.isNil(matchingKeybindingToTrigger)) {
      if (!R.isNil(currentCompoundTriggerStateRef.current)) {
        currentCompoundTriggerStateRef.current = null
      }

      return
    }

    const [keybinding, trigger] = matchingKeybindingToTrigger

    if (!R.isNil(currentCompoundTriggerStateRef.current) && trigger !== currentCompoundTriggerStateRef.current.trigger) {
      currentCompoundTriggerStateRef.current = null

      return
    }

    if (!isCompoundKeybindingTrigger(trigger)) {
      keybindingToHandlerRef.current.get(keybinding)?.(event)

      return
    }

    if (R.isNil(currentCompoundTriggerStateRef.current)) {
      const timeoutId = setTimeout(() => {
        currentCompoundTriggerStateRef.current = null
      }, 1000)

      currentCompoundTriggerStateRef.current = { trigger, timeoutId, index: 0 }
    }

    if (currentCompoundTriggerStateRef.current.index === trigger.sequence.length - 1) {
      clearTimeout(currentCompoundTriggerStateRef.current.timeoutId)

      currentCompoundTriggerStateRef.current = null

      keybindingToHandlerRef.current.get(keybinding)?.(event)
    } else {
      clearTimeout(currentCompoundTriggerStateRef.current.timeoutId)

      currentCompoundTriggerStateRef.current.timeoutId = setTimeout(() => {
        currentCompoundTriggerStateRef.current = null
      }, 1000)

      currentCompoundTriggerStateRef.current.index++
    }
  }, [])

  useEffect(() => {
    document.addEventListener(EVENT_TYPE, handleEvent)

    return () => {
      document.removeEventListener(EVENT_TYPE, handleEvent)
    }
  }, [handleEvent])

  const value = useMemo(() => {
    const add = (keybinding: Keybinding, handler: KeybindingHandler) => {
      keybindingToHandlerRef.current.set(keybinding, handler)
    }

    const remove = (keybinding: Keybinding) => {
      keybindingToHandlerRef.current.delete(keybinding)
    }

    return { add, remove }
  }, [])

  return (
    <KeybindingsContext.Provider value={value}>
      {children}
    </KeybindingsContext.Provider>
  )
}

export default KeybindingsProvider
