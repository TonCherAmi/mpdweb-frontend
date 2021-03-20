import React from 'react'

import DatabaseItemType from '@app/database/dto/enums/DatabaseItemType'

import * as Icons from '@app/common/icons'

const DatabaseItemTypeToIcon = {
  [DatabaseItemType.FILE]: Icons.FileFill,
  [DatabaseItemType.DIRECTORY]: Icons.FolderFill
}

interface Props {
  className: string
  type: DatabaseItemType
}

const DatabaseItemIcon: React.FC<Props> = ({ className, type }) => {
  const Icon = DatabaseItemTypeToIcon[type]

  return (
    <Icon className={className} />
  )
}

export default DatabaseItemIcon
