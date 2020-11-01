import React from 'react'

import cx from 'classnames'

import CurrentSong from '@app/status/components/CurrentSong'
import CurrentProgress from '@app/status/components/CurrentProgress'
import PlaybackControlGroup from '@app/playback/components/PlaybackControlGroup'

import * as PlaylistControls from '@app/playlist/components/PlaylistControls'
import * as DatabaseControls from '@app/database/components/DatabaseControls'

import styles from './styles.scss'

const BottomPanel = () => {
  return (
    <div className={styles.panel}>
      <div className={cx(styles.section, styles.song)}>
        <CurrentSong />
      </div>
      <div className={cx(styles.section, styles.controls)}>
        <PlaylistControls.ClearButton />
        <PlaybackControlGroup />
        <DatabaseControls.UpdateButton />
      </div>
      <div className={cx(styles.section, styles.progress)}>
        <CurrentProgress />
      </div>
    </div>
  )
}

export default BottomPanel
