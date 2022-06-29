import QueueItem from '@app/queue/data/QueueItem'

import PlaybackApi from '@app/playback/api'

class PlaybackService {
  play(item: Nullable<QueueItem> = null) {
    PlaybackApi.play({ id: item?.id })
  }

  toggle() {
    PlaybackApi.toggle()
  }

  stop() {
    PlaybackApi.stop()
  }

  prev() {
    PlaybackApi.prev()
  }

  next() {
    PlaybackApi.next()
  }

  seek(time: number) {
    PlaybackApi.seek({ time, mode: 'ABSOLUTE' })
  }

  single() {
    PlaybackApi.single.cycle()
  }

  random() {
    PlaybackApi.random.toggle()
  }

  repeat() {
    PlaybackApi.repeat.toggle()
  }

  consume() {
    PlaybackApi.consume.toggle()
  }
}

export default new PlaybackService()
