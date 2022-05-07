import { make } from '@app/common/api'

import PlaybackPlayBody from '@app/playback/dto/api/request/PlaybackPlayBody'
import PlaybackSeekBody from '@app/playback/dto/api/request/PlaybackSeekBody'

const Api = {
  stop: make<void>('/playback/stop', 'post'),
  play: make<void, PlaybackPlayBody>('/playback/play', 'post'),
  toggle: make<void>('/playback/toggle', 'post'),
  next: make<void>('/playback/next', 'post'),
  prev: make<void>('/playback/prev', 'post'),
  seek: make<void, PlaybackSeekBody>('/playback/seek', 'post')
}

export default Api
