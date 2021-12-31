import React from 'react'

import KeybindingScopeT from '@app/keybindings/types/KeybindingScope'

import KeybindingManager from '@app/keybindings/managers/KeybindingsManager'

interface Props {
  scope: KeybindingScopeT
}

class KeybindingScope extends React.Component<Props> {
  componentDidMount() {
    KeybindingManager.setScope(this.props.scope)
  }

  componentWillUnmount() {
    KeybindingManager.unsetScope(this.props.scope)
  }

  render() {
    return null
  }
}

export default KeybindingScope
