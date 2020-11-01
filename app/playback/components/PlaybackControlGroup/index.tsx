import React from 'react'
import { observer } from 'mobx-react'

import * as R from 'ramda'

import State from '@app/status/dto/enums/State'

import * as PlaybackControls from '@app/playback/components/PlaybackControls'

import PlaybackApi from '@app/playback/api'

import StatusStore from '@app/status/stores/StatusStore'

import styles from './styles.scss'

const PlaybackControlGroup = () => {
  const status = StatusStore.value

  if (R.isNil(status)) {
    return null
  }

  return (
    <div className={styles.group}>
      <PlaybackControls.PrevButton onClick={PlaybackApi.prev} />
      <PlaybackControls.ToggleButton
        isPlaying={status.state == State.PLAYING}
        onClick={PlaybackApi.toggle}
      />
      <PlaybackControls.StopButton onClick={PlaybackApi.stop} />
      <PlaybackControls.NextButton onClick={PlaybackApi.next} />
    </div>
  )
}

export default observer(PlaybackControlGroup)
