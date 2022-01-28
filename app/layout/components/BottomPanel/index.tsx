import React from 'react'

import cx from 'classnames'

import * as Icons from '@app/common/icons'

import CurrentSong from '@app/status/components/CurrentSong'
import CurrentProgress from '@app/status/components/CurrentProgress'
import PlaybackControls from '@app/playback/components/PlaybackControls'
import PlaylistClearButton from '@app/playlist/components/PlaylistClearButton'
import DatabaseUpdateButton from '@app/database/components/DatabaseUpdateButton'

import styles from './styles.scss'

const BottomPanel = () => {
  return (
    <div className={styles.panel}>
      <div className={cx(styles.section, styles.song)}>
        <CurrentSong />
      </div>
      <div className={cx(styles.section, styles.controls)}>
        <PlaylistClearButton className={cx(styles.sideButton, styles.clear)}>
          <Icons.TimesCircleFill className={styles.sideIcon} />
        </PlaylistClearButton>
        <PlaybackControls />
        <DatabaseUpdateButton className={cx(styles.sideButton, styles.update)}>
          <Icons.SyncAlt className={styles.sideIcon} />
        </DatabaseUpdateButton>
      </div>
      <div className={cx(styles.section, styles.progress)}>
        <CurrentProgress />
      </div>
    </div>
  )
}

export default BottomPanel
