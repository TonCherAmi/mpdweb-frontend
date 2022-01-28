import { make } from '@app/common/api'

import DatabaseItem from '@app/database/dto/DatabaseItem'
import DatabaseCount from '@app/database/dto/DatabaseCount'

import DatabaseGetBody from '@app/database/dto/api/request/DatabaseGetBody'
import DatabaseCountBody from '@app/database/dto/api/request/DatabaseCountBody'
import DatabaseSearchBody from '@app/database/dto/api/request/DatabaseSearchBody'

const Api = {
  get: make<DatabaseItem[], DatabaseGetBody>('/database', 'get', {
    query: ['uri']
  }),
  count: make<DatabaseCount, DatabaseCountBody>('/database/count', 'get', {
    query: ['uri']
  }),
  search: make<DatabaseItem[], DatabaseSearchBody>('/database/search', 'get', {
    query: ['term']
  }),
  update: make<void>('/database/update', 'post')
}

export default Api
