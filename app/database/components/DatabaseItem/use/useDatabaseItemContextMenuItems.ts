import * as R from 'ramda'

import QueueItem from '@app/queue/data/QueueItem'
import DatabaseTags from '@app/database/data/DatabaseTags'
import DatabaseItem from '@app/database/data/DatabaseItem'
import ContextMenuItem from '@app/common/components/ContextMenu/types/ContextMenuItem'

import useDatabaseActions from '@app/database/use/useDatabaseActions'
import useQueueActions from '@app/queue/use/useQueueActions'

import { basename } from '@app/common/utils/path'
import { copy } from '@app/navigator/utils/clipboard'
import { isDatabaseFile } from '@app/database/utils/types'
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

const useDatabaseItemContextMenuItems = (item: DatabaseItem | QueueItem) => {
  const { update } = useDatabaseActions()

  const { add, replace } = useQueueActions()

  const tagsCopyItems = 'position' in item || isDatabaseFile(item)
    ? getDatabaseTagsContextMenuCopyItems(item.tags)
    : []

  return [
    {
      id: 'copy',
      text: 'Copy',
      items: [
        ...tagsCopyItems,
        {
          id: 'copy-path',
          text: 'Copy Path',
          handler: () => copy(item.uri),
        },
        {
          id: 'copy-filename',
          text: 'Copy Filename',
          handler: () => {
            copy(basename(item.uri))
          },
        },
      ],
    },
    {
      id: 'add',
      text: 'Add',
      handler: () => add([item]),
    },
    {
      id: 'replace',
      text: 'Play',
      handler: () => replace([item]),
    },
    {
      id: 'update-at',
      text: 'Update At',
      handler: () => update(item.uri),
    },
  ]
}

export default useDatabaseItemContextMenuItems
