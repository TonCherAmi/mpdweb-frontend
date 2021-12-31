import React from 'react'

import { observer } from 'mobx-react'

import * as R from 'ramda'

import KeybindingScope from '@app/keybindings/types/KeybindingScope'

import KeybindingsStore from '@app/keybindings/stores/KeybindingsStore'

import KeybindingsManager, { ScopedKeybinding } from '@app/keybindings/managers/KeybindingsManager'

import { conformHandler, KeybindingHandlers } from './utils'

interface Props {
  scope?: Nullable<string>
  handlers: KeybindingHandlers
}

const DEFAULT_SCOPE: KeybindingScope = 'view'

@observer
class Keybindings extends React.Component<Props> {
  private readonly store = KeybindingsStore

  private scopedKeybindings: ScopedKeybinding[] = []

  componentDidMount() {
    const { scope = DEFAULT_SCOPE } = this.props

    this.scopedKeybindings = R.reject(
      R.isNil,
      R.values(
        R.mapObjIndexed((handler, keybindingId) => {
          const keybinding = this.store.keybindings[keybindingId]

          if (R.isNil(keybinding)) {
            return null
          }

          return KeybindingsManager.add({
            scope,
            ...keybinding
          }, conformHandler(handler))
        }, this.props.handlers)
      )
    )
  }

  componentWillUnmount() {
    R.forEach((scopedKeybinding) => {
      KeybindingsManager.remove(scopedKeybinding)
    }, this.scopedKeybindings)
  }

  render() {
    return null
  }
}

export type { KeybindingHandlers }

export default Keybindings
