import React from 'react'
import { observer } from 'mobx-react'

import * as R from 'ramda'

import State from '@app/status/dto/enums/State'

import PlaybackApi from '@app/playback/api'

import StatusStore from '@app/status/stores/StatusStore'
import PlaylistStore from '@app/playlist/stores/PlaylistStore'

import NextIcon from '@app/playback/icons/NextIcon'
import PrevIcon from '@app/playback/icons/PrevIcon'
import PauseIcon from '@app/playback/icons/PauseIcon'
import PlayIcon from '@app/playback/icons/PlayIcon'
import StopIcon from '@app/playback/icons/StopIcon'

import DurationPair from '@app/common/components/DurationPair'

const PlaybackControls = () => {
  const status = StatusStore.value

  const handleToggleClick = PlaybackApi.toggle

  const playlistItem = PlaylistStore.items[status?.currentSong]

  const minutes = status?.elapsed?.minutes
  const seconds = status?.elapsed?.seconds

  const paddedSeconds = R.isNil(seconds) ? null : String(seconds).padStart(2, '0')

  const totalMinutes = status?.duration?.minutes
  const totalSeconds = status?.duration?.seconds

  const paddedTotalSeconds = R.isNil(totalSeconds) ? null : String(totalSeconds).padStart(2, '0')

  return (
    <div className="playback">
      <div className="section track">
        <div className="container">
          <span className="title">
            {playlistItem?.title}
          </span>
          <span className="artist">
            {playlistItem?.artist}
          </span>
        </div>
      </div>
      <div className="section controls">
        <div className="control" onClick={PlaybackApi.prev}>
          <PrevIcon />
        </div>
        <div className="control toggle" onClick={handleToggleClick}>
          <Choose>
            <When condition={status?.state == State.PLAYING}>
              <PauseIcon />
            </When>
            <Otherwise>
              <PlayIcon />
            </Otherwise>
          </Choose>
        </div>
        <div className="control stop" onClick={PlaybackApi.stop}>
          <StopIcon />
        </div>
        <div className="control" onClick={PlaybackApi.next}>
          <NextIcon />
        </div>
      </div>
      <div className="section misc">
        <If condition={!R.isNil(status)}>
          <DurationPair first={status?.elapsed} second={status?.duration} />
        </If>
      </div>
    </div>
  )
}

export default observer(PlaybackControls)
