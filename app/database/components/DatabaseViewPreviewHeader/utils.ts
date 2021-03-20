import * as R from 'ramda'

import DatabaseItem from '@app/database/dto/DatabaseItem'
import DatabaseFile from '@app/database/dto/DatabaseFile'
import DatabaseItemType from '@app/database/dto/enums/DatabaseItemType'

import { thread } from '@app/common/utils/fn'
import { basename, dirname } from '@app/common/utils/path'

export const getTitle = (item: DatabaseItem): string => {
  if (item.type === DatabaseItemType.FILE) {
    const file = item as DatabaseFile

    if (!R.isNil(file.title)) {
      return file.title
    }
  }

  return basename(item.uri)
}

export const getSubtitle = (item: DatabaseItem): string => {
  if (item.type === DatabaseItemType.FILE) {
    const file = item as DatabaseFile

    if (!R.isNil(file.artist)) {
      return file.artist
    }
  }

  return thread(item.uri, dirname, basename)
}
