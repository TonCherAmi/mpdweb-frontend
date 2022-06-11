import React from 'react'

import StatusProvider from '@app/status/components/StatusProvider'
import QueueProvider from '@app/queue/providers/QueueProvider'
import FocusScopeProvider from '@app/ui/providers/FocusScopeProvider'
import ModalStateProvider from '@app/ui/providers/ModalStateProvider'
import KeybindingsProvider from '@app/keybindings/providers/KeybindingsProvider'
import ContextMenuProvider from '@app/common/providers/ContextMenuProvider'
import UiInteractionModeProvider from '@app/ui/providers/UiInteractionModeProvider'

const providers = [
  StatusProvider,
  QueueProvider,
  ModalStateProvider,
  ContextMenuProvider,
  FocusScopeProvider,
  KeybindingsProvider,
  UiInteractionModeProvider,
] as const

const Providers = ({ children }: { children: React.ReactNode }) => {
  const fragment = (
    <React.Fragment>
      {children}
    </React.Fragment>
  )

  return providers.reduce((acc, Provider) => {
    return (
      <Provider>
        {acc}
      </Provider>
    )
  }, fragment)
}

export default Providers
