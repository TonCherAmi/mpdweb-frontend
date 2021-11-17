import { make, HttpMethod } from '@app/common/api'

import DatabaseItem from '@app/database/dto/DatabaseItem'
import DatabaseCount from '@app/database/dto/DatabaseCount'

import DatabaseGetBody from '@app/database/dto/api/request/DatabaseGetBody'
import DatabaseCountBody from '@app/database/dto/api/request/DatabaseCountBody'
import DatabaseSearchBody from '@app/database/dto/api/request/DatabaseSearchBody'

const Api = {
  get: make<DatabaseItem[], DatabaseGetBody>('/database', HttpMethod.GET, {
    query: ['uri']
  }),
  count: make<DatabaseCount, DatabaseCountBody>('/database/count', HttpMethod.GET, {
    query: ['uri']
  }),
  search: make<DatabaseItem[], DatabaseSearchBody>('/database/search', HttpMethod.GET, {
    query: ['term']
  }),
  update: make<void>('/database/update', HttpMethod.POST)
}

export default Api
