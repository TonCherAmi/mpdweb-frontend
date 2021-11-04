import React from 'react'

import { Route as DatabaseViewRoute } from '@app/database/views/DatabaseView'

import * as Icons from '@app/common/icons'

import { Route as DatabaseSearchViewRoute } from '@app/database/views/DatabaseSearchView'

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
    text: 'Search',
    path: DatabaseSearchViewRoute.path,
    icon: Icons.Search
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
