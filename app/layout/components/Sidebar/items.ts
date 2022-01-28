import React from 'react'

import * as Icons from '@app/common/icons'

import { route as DatabaseViewRoute } from '@app/database/views/DatabaseView'

export interface SidebarItem {
  text: string
  path: string
  icon: React.ElementType
}

export const items: SidebarItem[] = [
  {
    text: 'Files',
    path: DatabaseViewRoute.path,
    icon: Icons.FolderFill
  },
  {
    text: 'Playlists',
    path: '/playlists',
    icon: Icons.MusicNoteList
  },
  {
    text: 'Favorites',
    path: '/favorites',
    icon: Icons.HeartFill
  }
]
