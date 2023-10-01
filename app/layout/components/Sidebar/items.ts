import React from 'react'

import * as Icons from '@app/common/icons'

import { route as HistoryViewRoute } from '@app/history/views/HistoryView'
import { route as SettingsViewRoute } from '@app/settings/views/SettingsView'
import { route as DatabaseViewRoute } from '@app/database/views/DatabaseView'
import { route as PlaylistsViewRoute } from '@app/playlists/views/PlaylistsView'
import { route as DatabaseRecentsViewRoute } from '@app/database/views/DatabaseRecentsView'

export interface SidebarItem {
  text: string
  path: string
  icon: React.ElementType
}

export const items: ReadonlyArray<SidebarItem> = [
  {
    text: 'Files',
    path: DatabaseViewRoute.path,
    icon: Icons.FolderFill,
  },
  {
    text: 'Playlists',
    path: PlaylistsViewRoute.path,
    icon: Icons.Playlist,
  },
  {
    text: 'Recently Added',
    path: DatabaseRecentsViewRoute.path,
    icon: Icons.ClockFill,
  },
  {
    text: 'Listening History',
    path: HistoryViewRoute.path,
    icon: Icons.ClockRotateLeft,
  },
  {
    text: 'Settings',
    path: SettingsViewRoute.path,
    icon: Icons.Gear,
  },
]
