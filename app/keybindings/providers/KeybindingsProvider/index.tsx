import React, { useEffect, useCallback, useRef, useMemo } from 'react'

import * as R from 'ramda'

import Handler from '@app/common/types/Handler'
import TimeoutId from '@app/common/types/TimeoutId'

import KeybindingsContext, {
  KeybindingTrigger,
  CompoundKeybindingTrigger,
} from '@app/keybindings/contexts/KeybindingsContext'

import {
  doesSimpleTriggerMatch,
  isCompoundKeybindingTrigger,
  isKeyboardEventTargetTextInputElement,
} from './utils'

export type KeybindingHandler = Handler<KeyboardEvent>

export interface Keybinding {
  isRepeatable: boolean
  triggers: ReadonlyArray<KeybindingTrigger>
}

const EVENT_TYPE = 'keydown'

const COMPOUND_TRIGGER_TIMEOUT_MS = 1000

const KeybindingsProvider = ({ children }: { children: React.ReactNode }) => {
  const currentCompoundTriggerStateRef = useRef<Nullable<{
    index: number
    triggers: ReadonlyArray<CompoundKeybindingTrigger>
    timeoutId: TimeoutId
  }>>(null)

  const keybindingToHandlerRef = useRef(new Map<Keybinding, KeybindingHandler>())

  const handleEvent: KeybindingHandler = useCallback((event) => {
    if (isKeyboardEventTargetTextInputElement(event)) {
      return
    }

    const findMatchingTrigger = (keybinding: Keybinding): Nullable<KeybindingTrigger> => {
      return R.find((trigger): boolean => {
        if (!R.isNil(currentCompoundTriggerStateRef.current) && !isCompoundKeybindingTrigger(trigger)) {
          return false
        }

        const simpleTrigger = isCompoundKeybindingTrigger(trigger)
          ? R.nth(currentCompoundTriggerStateRef.current?.index ?? 0, trigger.sequence)
          : trigger

        if (R.isNil(simpleTrigger)) {
          return false
        }

        return doesSimpleTriggerMatch(simpleTrigger, event)
      }, keybinding.triggers)
    }

    const matchingKeybindingToTrigger: ReadonlyArray<[Keybinding, KeybindingTrigger]> = Array.from(keybindingToHandlerRef.current.keys())
      .filter(({ isRepeatable }) => !event.repeat || (event.repeat && isRepeatable))
      .map((keybinding): [Keybinding, Nullable<KeybindingTrigger>] => [keybinding, findMatchingTrigger(keybinding)])
      .filter((keybindingToTrigger): keybindingToTrigger is [Keybinding, KeybindingTrigger] => !R.isNil(keybindingToTrigger[1]))

    if (R.isEmpty(matchingKeybindingToTrigger)) {
      currentCompoundTriggerStateRef.current = null

      return
    }

    const anySimpleTriggersMatched = R.any(
      ([, trigger]) => !isCompoundKeybindingTrigger(trigger),
      matchingKeybindingToTrigger,
    )

    const anyCompoundTriggersMatched = R.any(
      ([, trigger]) => isCompoundKeybindingTrigger(trigger),
      matchingKeybindingToTrigger,
    )

    if (anySimpleTriggersMatched && anyCompoundTriggersMatched) {
      throw Error('conflicting triggers found: simple + compound')
    }

    if (anySimpleTriggersMatched) {
      if (matchingKeybindingToTrigger.length > 1) {
        throw Error('conflicting triggers found: simple + simple')
      }

      const [keybinding] = matchingKeybindingToTrigger[0]

      keybindingToHandlerRef.current.get(keybinding)?.(event)

      return
    }

    const matchingTriggers = R.map(
      ([, trigger]) => trigger as CompoundKeybindingTrigger,
      matchingKeybindingToTrigger
    )

    const compoundTriggersIntersection = R.intersection(
      matchingTriggers,
      currentCompoundTriggerStateRef.current?.triggers ?? []
    )

    if (!R.isNil(currentCompoundTriggerStateRef.current) && R.isEmpty(compoundTriggersIntersection)) {
      currentCompoundTriggerStateRef.current = null

      return
    }

    if (R.isNil(currentCompoundTriggerStateRef.current)) {
      const timeoutId = setTimeout(() => {
        currentCompoundTriggerStateRef.current = null
      }, COMPOUND_TRIGGER_TIMEOUT_MS)

      currentCompoundTriggerStateRef.current = { triggers: matchingTriggers, timeoutId, index: 0 }
    }

    const anyFinalTriggerHit = R.any(
      trigger => trigger.sequence.length - 1 === currentCompoundTriggerStateRef.current?.index,
      compoundTriggersIntersection,
    )

    if (anyFinalTriggerHit && compoundTriggersIntersection.length > 1) {
      throw Error('conflicting triggers found: compound + compound')
    }

    if (anyFinalTriggerHit) {
      clearTimeout(currentCompoundTriggerStateRef.current.timeoutId)

      currentCompoundTriggerStateRef.current = null

      const [keybinding] = matchingKeybindingToTrigger[0]

      keybindingToHandlerRef.current.get(keybinding)?.(event)
    } else {
      clearTimeout(currentCompoundTriggerStateRef.current.timeoutId)

      currentCompoundTriggerStateRef.current.timeoutId = setTimeout(() => {
        currentCompoundTriggerStateRef.current = null
      }, COMPOUND_TRIGGER_TIMEOUT_MS)

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
