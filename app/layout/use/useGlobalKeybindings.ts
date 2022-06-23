import useKeybindings from '@app/keybindings/use/useKeybindings'

import QueueService from '@app/queue/services/QueueService'
import VolumeService from '@app/volume/services/VolumeService'
import PlaybackService from '@app/playback/services/PlaybackService'
import DatabaseService from '@app/database/services/DatabaseService'

const VOLUME_STEP = 5

// these keybindings are not affected by focus scope
const useGlobalKeybindings = () => {
  useKeybindings({
    PLAYBACK_STOP: PlaybackService.stop,
    PLAYBACK_TOGGLE: PlaybackService.toggle,
    PLAYBACK_NEXT: PlaybackService.next,
    PLAYBACK_PREV: PlaybackService.prev,
    PLAYBACK_OPTIONS_SINGLE_TOGGLE: PlaybackService.single,
    PLAYBACK_OPTIONS_RANDOM_TOGGLE: PlaybackService.random,
    PLAYBACK_OPTIONS_REPEAT_TOGGLE: PlaybackService.repeat,
    PLAYBACK_OPTIONS_CONSUME_TOGGLE: PlaybackService.consume,
    VOLUME_UP: () => VolumeService.inc(VOLUME_STEP),
    VOLUME_DOWN: () => VolumeService.dec(VOLUME_STEP),
    DATABASE_UPDATE: DatabaseService.update,
    QUEUE_CLEAR: QueueService.clear,
  })
}

export default useGlobalKeybindings
