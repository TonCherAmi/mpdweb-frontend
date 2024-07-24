import { createContext } from 'react'

import Thunk from '@app/common/types/Thunk'

import DatabaseItemLabelsByUri from '@app/labels/data/api/DatabaseItemLabelsByUri'

const noop = () => {
  throw Error('DatabaseItemLabelsContext provider required')
}

const DatabaseItemLabelsContext = createContext<readonly [
  Nullable<DatabaseItemLabelsByUri>,
  Thunk
]>([null, noop])

export default DatabaseItemLabelsContext
