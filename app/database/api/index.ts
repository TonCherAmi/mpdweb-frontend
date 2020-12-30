import { make, HttpMethod, } from '@app/common/api'

import DatabaseItem from '@app/database/dto/DatabaseItem'

import DatabaseGetBody from '@app/database/dto/api/request/DatabaseGetBody'

const Api = {
  get: make<DatabaseItem[], DatabaseGetBody>('/database', HttpMethod.GET, {
    query: ['uri']
  }),
  update: make<void>('/database/update', HttpMethod.POST)
}

export default Api
