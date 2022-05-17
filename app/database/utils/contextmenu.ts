import * as R from 'ramda'

import DatabaseItem from '@app/database/dto/DatabaseItem'
import DatabaseFile from '@app/database/dto/DatabaseFile'
import ContextMenuItem from '@app/common/components/ContextMenu/types/ContextMenuItem'

import { copy } from '@app/navigator/utils/clipboard'
import { basename } from '@app/common/utils/path'

const getDatabaseFileContextMenuCopyItems = (
  databaseFile: DatabaseFile
): ReadonlyArray<ContextMenuItem> => {
  const title = databaseFile.title
  const artist = databaseFile.artist

  const copyArtist = R.isNil(artist) ? null : {
    id: 'copy-artist',
    text: 'Copy Artist',
    handler: () => copy(artist)
  }

  const copyTitle = R.isNil(title) ? null : {
    id: 'copy-title',
    text: 'Copy Title',
    handler: () => copy(title)
  }

  return R.reject(R.isNil, [copyArtist, copyTitle])
}

const isDatabaseFile = (databaseItem: DatabaseItem): databaseItem is DatabaseFile => (
  databaseItem.type === 'FILE'
)

export const getDatabaseItemContextMenuItems = (
  databaseItem: DatabaseItem
): ReadonlyArray<ContextMenuItem> => {
  const databaseFileSpecificCopyItems = !isDatabaseFile(databaseItem)
    ? []
    : getDatabaseFileContextMenuCopyItems(databaseItem)

  return [
    {
      id: 'copy',
      text: 'Copy',
      items: [
        {
          id: 'copy-filename',
          text: 'Copy Filename',
          handler: () => {
            copy(
              basename(databaseItem.uri)
            )
          }
        },
        {
          id: 'copy-path',
          text: 'Copy Path',
          handler: () => copy(databaseItem.uri)
        },
        ...databaseFileSpecificCopyItems
      ]
    }
  ]
}
