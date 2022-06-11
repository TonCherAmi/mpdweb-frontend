import * as R from 'ramda'

import DatabaseItem from '@app/database/data/DatabaseItem'
import DatabaseFile from '@app/database/data/DatabaseFile'
import ContextMenuItem from '@app/common/components/ContextMenu/types/ContextMenuItem'

import { copy } from '@app/navigator/utils/clipboard'
import { basename } from '@app/common/utils/path'

const getDatabaseFileContextMenuCopyItems = (
  databaseFile: DatabaseFile
): ReadonlyArray<ContextMenuItem> => {
  const title = databaseFile.title
  const artist = databaseFile.artist

  const copyTitle = R.isNil(title) ? null : {
    id: 'copy-title',
    text: 'Copy Title',
    handler: () => copy(title),
  }

  const copyArtist = R.isNil(artist) ? null : {
    id: 'copy-artist',
    text: 'Copy Artist',
    handler: () => copy(artist),
  }

  return R.reject(R.isNil, [copyTitle, copyArtist])
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
        ...databaseFileSpecificCopyItems,
        {
          id: 'copy-path',
          text: 'Copy Path',
          handler: () => copy(databaseItem.uri),
        },
        {
          id: 'copy-filename',
          text: 'Copy Filename',
          handler: () => {
            copy(
              basename(databaseItem.uri)
            )
          },
        },
      ],
    },
  ]
}
