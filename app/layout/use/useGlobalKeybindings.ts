import { useHistory } from 'react-router-dom'

import useKeybindings from '@app/keybindings/use/useKeybindings'
import useQueueActions from '@app/queue/use/useQueueActions'
import useVolumeContext from '@app/volume/use/useVolumeContext'
import usePlaybackActions from '@app/playback/use/usePlaybackActions'
import useDatabaseActions from '@app/database/use/useDatabaseActions'
import useStatefulQueueActions from '@app/queue/use/useStatefulQueueActions'
import useStatefulPlaybackActions from '@app/playback/use/useStatefulPlaybackActions'

// these keybindings are not affected by focus scope
const useGlobalKeybindings = () => {
  const { stop } = usePlaybackActions()
  const { update } = useDatabaseActions()
  const { toggle } = useStatefulPlaybackActions()
  const { next, prev, clear } = useQueueActions()
  const { inc: incVolume, dec: decVolume } = useVolumeContext()

  const {
    toggleRepeat,
    cycleSingle,
    cycleConsume,
    toggleRandom,
  } = useStatefulQueueActions()

  const router = useHistory()

  useKeybindings({
    PLAYBACK_STOP: stop,
    PLAYBACK_TOGGLE: toggle,
    PLAYBACK_NEXT: next,
    PLAYBACK_PREV: prev,
    PLAYBACK_OPTIONS_SINGLE_TOGGLE: cycleSingle,
    PLAYBACK_OPTIONS_RANDOM_TOGGLE: toggleRandom,
    PLAYBACK_OPTIONS_REPEAT_TOGGLE: toggleRepeat,
    PLAYBACK_OPTIONS_CONSUME_TOGGLE: cycleConsume,
    VOLUME_UP: incVolume,
    VOLUME_DOWN: decVolume,
    DATABASE_UPDATE: () => update(),
    QUEUE_CLEAR: clear,
    HISTORY_BACK: () => router.goBack(),
    HISTORY_FORWARD: () => router.goForward(),
  })
}

export default useGlobalKeybindings
