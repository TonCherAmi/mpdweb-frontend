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

const isDatabaseFile = (item: DatabaseItem): item is DatabaseFile => (
  item.type === 'FILE'
)

export const getDatabaseItemContextMenuItems = (
  item: DatabaseItem
): ReadonlyArray<ContextMenuItem> => {
  const databaseFileSpecificCopyItems = !isDatabaseFile(item)
    ? []
    : getDatabaseFileContextMenuCopyItems(item)

  return [
    {
      id: 'copy',
      text: 'Copy',
      items: [
        ...databaseFileSpecificCopyItems,
        {
          id: 'copy-path',
          text: 'Copy Path',
          handler: () => copy(item.uri),
        },
        {
          id: 'copy-filename',
          text: 'Copy Filename',
          handler: () => {
            copy(
              basename(item.uri)
            )
          },
        },
      ],
    },
  ]
}
