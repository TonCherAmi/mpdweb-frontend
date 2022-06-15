import React from 'react'

import CacheProvider from '@app/common/providers/CacheProvider'
import QueueProvider from '@app/queue/providers/QueueProvider'
import ModalProvider from '@app/ui/providers/ModalProvider'
import StatusProvider from '@app/status/components/StatusProvider'
import FocusScopeProvider from '@app/ui/providers/FocusScopeProvider'
import ContextMenuProvider from '@app/ui/providers/ContextMenuProvider'
import KeybindingsProvider from '@app/keybindings/providers/KeybindingsProvider'
import UiInteractionModeProvider from '@app/ui/providers/UiInteractionModeProvider'

const providers = [
  StatusProvider,
  QueueProvider,
  ModalProvider,
  ContextMenuProvider,
  FocusScopeProvider,
  KeybindingsProvider,
  UiInteractionModeProvider,
  CacheProvider,
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
