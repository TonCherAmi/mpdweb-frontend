import { make } from '@app/common/api'

import VolumeSetBody from '@app/volume/data/api/request/VolumeSetBody'

const Api = {
  set: make<void, VolumeSetBody>('/volume', 'post')
}

export default Api
