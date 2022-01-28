import * as R from 'ramda'

import Handler from '@app/common/types/Handler'

type Mod = 'ctrl' | 'shift' | 'alt' | 'meta'

export type KeybindingTrigger = string | { key: string, mods: Mod[] }

export type KeybindingHandler = Handler<KeyboardEvent>

export interface Keybinding {
  isRepeatable: boolean
  triggers: KeybindingTrigger[]
}

export interface ScopedKeybinding extends Keybinding {
  scope?: Nullable<string>
}

const EVENT_TYPE = 'keydown'

class KeybindingsManager {
  private element = document

  private keybindingToHandler = new Map<ScopedKeybinding, KeybindingHandler>()

  private previousScopes: string[] = []

  private currentScope: Nullable<string>

  constructor() {
    this.element.addEventListener(EVENT_TYPE, this.handleKeyDown)
  }

  dispose() {
    this.element.removeEventListener(EVENT_TYPE, this.handleKeyDown)
  }

  add(scopedKeybinding: ScopedKeybinding, scopedHandler: KeybindingHandler): ScopedKeybinding {
    this.keybindingToHandler.set(scopedKeybinding, scopedHandler)

    return scopedKeybinding
  }

  remove(scopedKeybinding: ScopedKeybinding): ScopedKeybinding {
    this.keybindingToHandler.delete(scopedKeybinding)

    return scopedKeybinding
  }

  setScope(scope: string) {
    if (R.isNil(this.currentScope)) {
      this.currentScope = scope

      return
    }

    this.previousScopes.push(this.currentScope)

    this.currentScope = scope
  }

  unsetScope(scope: string) {
    if (R.isNil(this.currentScope)) {
      return
    }

    if (this.currentScope !== scope) {
      this.previousScopes = R.reject(
        R.equals(scope),
        this.previousScopes
      )

      return
    }

    this.currentScope = this.previousScopes.pop()
  }

  private readonly handleKeyDown = (keyboardEvent: KeyboardEvent) => {
    if (this.shouldIgnoreEvent(keyboardEvent)) {
      return
    }

    const matchingKeybindings = R.filter(
      this.doesScopedKeybindingMatch(keyboardEvent),
      Array.from(this.keybindingToHandler.keys())
    )

    R.forEach((keybinding) => {
      this.keybindingToHandler.get(keybinding)?.(keyboardEvent)
    }, matchingKeybindings)
  }

  private shouldIgnoreEvent(keyboardEvent: KeyboardEvent): boolean {
    return keyboardEvent.target instanceof HTMLInputElement
      || keyboardEvent.target instanceof HTMLTextAreaElement
      || keyboardEvent.target instanceof HTMLSelectElement
  }

  private readonly doesScopedKeybindingMatch = (
    keyboardEvent: KeyboardEvent
  ) => (keybinding: ScopedKeybinding): boolean => {
    if (keyboardEvent.repeat && !keybinding.isRepeatable) {
      return false
    }

    if (keybinding.scope !== this.currentScope) {
      return false
    }

    const matchingTrigger = R.find(
      this.doesTriggerMatch(keyboardEvent),
      keybinding.triggers
    )

    if (R.isNil(matchingTrigger)) {
      return false
    }

    if (R.is(String, matchingTrigger) || R.isEmpty(matchingTrigger.mods)) {
      return true
    }

    return this.doModsMatch(keyboardEvent, matchingTrigger.mods)
  }

  private readonly doesTriggerMatch = (keyboardEvent: KeyboardEvent) => (trigger: KeybindingTrigger): boolean => {
    const key = R.is(String, trigger)
      ? trigger
      : trigger.key

    return this.doesKeyMatch(key, keyboardEvent)
  }

  private readonly doesKeyMatch = (key: string, keyboardEvent: KeyboardEvent): boolean => {
    return key.toLowerCase() === keyboardEvent.key.toLowerCase()
  }

  private readonly doModsMatch = (keyboardEvent: KeyboardEvent, mods: Mod[]): boolean => {
    return R.any(
      (mod) => (
        R.prop(mod, {
          shift: keyboardEvent.shiftKey,
          ctrl: keyboardEvent.ctrlKey,
          meta: keyboardEvent.metaKey,
          alt: keyboardEvent.altKey
        })
      ),
      mods
    )
  }
}

export default new KeybindingsManager()
