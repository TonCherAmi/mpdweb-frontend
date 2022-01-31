import React from 'react'

import StatusProvider from '@app/status/components/StatusProvider'
import PlaylistProvider from '@app/playlist/providers/PlaylistProvider'
import ModalStateProvider from '@app/ui/providers/ModalStateProvider'
import UiInteractionModeProvider from '@app/ui/providers/UiInteractionModeProvider'

const providers = [
  StatusProvider,
  PlaylistProvider,
  ModalStateProvider,
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
