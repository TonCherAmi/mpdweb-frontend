import { make } from '@app/common/api'

import Status from '@app/status/data/Status'

const Api = {
  get: make<Status>('/status')
}

export default Api
