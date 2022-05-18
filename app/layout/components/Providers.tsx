import React from 'react'

import StatusProvider from '@app/status/components/StatusProvider'
import QueueProvider from '@app/queue/providers/QueueProvider'
import ModalStateProvider from '@app/ui/providers/ModalStateProvider'
import ContextMenuProvider from '@app/common/providers/ContextMenuProvider'
import UiInteractionModeProvider from '@app/ui/providers/UiInteractionModeProvider'

const providers = [
  StatusProvider,
  QueueProvider,
  ModalStateProvider,
  ContextMenuProvider,
  UiInteractionModeProvider
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
