import { make, HttpMethod } from '@app/common/api'

const Api = {
  stop: make<void>('/playback/stop', HttpMethod.POST),
  toggle: make<void>('/playback/toggle', HttpMethod.POST),
  next: make<void>('/playback/next', HttpMethod.POST),
  prev: make<void>('/playback/prev', HttpMethod.POST)
}

export default Api
