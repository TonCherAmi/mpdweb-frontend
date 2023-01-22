import * as R from 'ramda'

import DatabaseTags from '@app/database/data/DatabaseTags'
import ContextMenuItem from '@app/common/components/ContextMenu/types/ContextMenuItem'

import { copy } from '@app/navigator/utils/clipboard'
import { basename } from '@app/common/utils/path'
import { formatDatabaseTags } from '@app/database/utils/format'

const getDatabaseTagsContextMenuCopyItems = (
  tags: DatabaseTags
): ReadonlyArray<ContextMenuItem> => {
  const { title, artist } = formatDatabaseTags(tags)

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

export const getDatabaseItemContextMenuItems = (
  { uri, tags }: { uri: string, tags?: DatabaseTags }
): ReadonlyArray<ContextMenuItem> => {
  const tagsCopyItems = R.isNil(tags)
    ? []
    : getDatabaseTagsContextMenuCopyItems(tags)

  return [
    {
      id: 'copy',
      text: 'Copy',
      items: [
        ...tagsCopyItems,
        {
          id: 'copy-path',
          text: 'Copy Path',
          handler: () => copy(uri),
        },
        {
          id: 'copy-filename',
          text: 'Copy Filename',
          handler: () => {
            copy(basename(uri))
          },
        },
      ],
    },
  ]
}
