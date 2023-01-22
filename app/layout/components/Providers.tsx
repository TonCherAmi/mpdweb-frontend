import React from 'react'

import ModalProvider from '@app/ui/providers/ModalProvider'
import CacheProvider from '@app/common/providers/CacheProvider'
import VolumeProvider from '@app/volume/providers/VolumeProvider'
import ChannelProvider from '@app/channel/providers/ChannelProvider'
import FocusScopeProvider from '@app/ui/providers/FocusScopeProvider'
import ContextMenuProvider from '@app/ui/providers/ContextMenuProvider'
import KeybindingsProvider from '@app/keybindings/providers/KeybindingsProvider'
import UiInteractionModeProvider from '@app/ui/providers/UiInteractionModeProvider'
import CurrentSongElapsedProvider from '@app/status/providers/CurrentSongElapsedProvider'

const providers = [
  VolumeProvider,
  CurrentSongElapsedProvider,
  ChannelProvider,
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
