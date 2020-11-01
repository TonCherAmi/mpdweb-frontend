import { make, HttpMethod, } from '@app/common/api'

const Api = {
  update: make<void>('/database/update', HttpMethod.POST)
}

export default Api
