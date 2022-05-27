import { make } from '@app/common/api'

import DatabaseItem from '@app/database/data/DatabaseItem'
import DatabaseCount from '@app/database/data/DatabaseCount'

import DatabaseGetBody from '@app/database/data/api/request/DatabaseGetBody'
import DatabaseCountBody from '@app/database/data/api/request/DatabaseCountBody'
import DatabaseSearchBody from '@app/database/data/api/request/DatabaseSearchBody'

const Api = {
  get: make<ReadonlyArray<DatabaseItem>, DatabaseGetBody>('/database', 'get', {
    query: ['uri']
  }),
  count: make<DatabaseCount, DatabaseCountBody>('/database/count', 'get', {
    query: ['uri']
  }),
  search: make<ReadonlyArray<DatabaseItem>, DatabaseSearchBody>('/database/search', 'get', {
    query: ['term']
  }),
  update: make<void>('/database/update', 'post')
}

export default Api
