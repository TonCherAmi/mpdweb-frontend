import React from 'react'

import * as Icons from '@app/common/icons'

import { route as DatabaseViewRoute } from '@app/database/views/DatabaseView'
import { route as PlaylistsViewRoute } from '@app/playlists/views/PlaylistsView'

export interface SidebarItem {
  text: string
  path: string
  icon: React.ElementType
}

export const items: ReadonlyArray<SidebarItem> = [
  {
    text: 'Files',
    path: DatabaseViewRoute.path,
    icon: Icons.FolderFill
  },
  {
    text: 'Playlists',
    path: PlaylistsViewRoute.path,
    icon: Icons.MusicNoteList
  },
  {
    text: 'Favorites',
    path: '/favorites',
    icon: Icons.HeartFill
  }
]
