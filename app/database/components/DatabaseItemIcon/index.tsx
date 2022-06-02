import React from 'react'

import DatabaseItemType from '@app/database/types/DatabaseItemType'

import * as Icons from '@app/common/icons'

const DatabaseItemTypeToIcon = {
  FILE: Icons.FileFill,
  DIRECTORY: Icons.FolderFill,
  PLAYLIST: Icons.Playlist
} as const

interface Props {
  className: string
  type: DatabaseItemType
}

const DatabaseItemIcon = ({ className, type }: Props) => {
  const Icon = DatabaseItemTypeToIcon[type]

  return (
    <Icon className={className} />
  )
}

export default DatabaseItemIcon
