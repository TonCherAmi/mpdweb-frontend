import * as R from 'ramda'

import {
  Mod,
  KeybindingTrigger,
  CompoundKeybindingTrigger,
} from '@app/keybindings/contexts/KeybindingsContext'

const getKeyboardEventMods = (event: KeyboardEvent): ReadonlyArray<Mod> => {
  const pairs = [
    ['shift', event.shiftKey],
    ['ctrl', event.ctrlKey],
    ['meta', event.metaKey],
    ['alt', event.altKey],
  ] as const

  return pairs
    .filter(R.nth(1))
    .flatMap(([mod]) => mod)
}

export const doesSimpleTriggerMatch = (
  trigger: Exclude<KeybindingTrigger, CompoundKeybindingTrigger>,
  event: KeyboardEvent
): boolean => {
  const key = R.is(String, trigger)
    ? trigger
    : trigger.key

  if (key.toLowerCase() !== event.key.toLowerCase()) {
    return false
  }

  const eventMods = getKeyboardEventMods(event)

  if (R.is(String, trigger)) {
    return R.isEmpty(eventMods)
  }

  return R.isEmpty(
    R.symmetricDifference(trigger.mods, eventMods)
  )
}

export const isCompoundTrigger = (
  trigger: KeybindingTrigger
): trigger is CompoundKeybindingTrigger => {
  return R.has('sequence', trigger)
}

const isEventTargetTextInputElement = (event: KeyboardEvent): boolean => {
  return event.target instanceof HTMLInputElement
    || event.target instanceof HTMLTextAreaElement
}

const mods = ['ctrl', 'shift', 'meta', 'alt'];

const isModEvent = (event: KeyboardEvent): boolean => {
  return mods.includes(event.key.toLowerCase())
}

export const shouldIgnoreEvent = (event: KeyboardEvent): boolean => {
  return isEventTargetTextInputElement(event)
    || isModEvent(event)
}
