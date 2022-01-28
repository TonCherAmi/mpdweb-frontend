import { make } from '@app/common/api'

const Api = {
  stop: make<void>('/playback/stop', 'post'),
  toggle: make<void>('/playback/toggle', 'post'),
  next: make<void>('/playback/next', 'post'),
  prev: make<void>('/playback/prev', 'post')
}

export default Api
