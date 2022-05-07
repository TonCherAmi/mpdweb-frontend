import React from 'react'

import cx from 'classnames'

import * as Icons from '@app/common/icons'

import Volume from '@app/volume/components/Volume'
import CurrentSong from '@app/status/components/CurrentSong'
import PlaybackControls from '@app/playback/components/PlaybackControls'
import CurrentSongProgress from '@app/status/components/CurrentSongProgress'
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
        <div className={styles.buttons}>
          <PlaylistClearButton className={cx(styles.sideButton, styles.clear)}>
            <Icons.TimesCircleFill className={styles.sideIcon} />
          </PlaylistClearButton>
          <PlaybackControls />
          <DatabaseUpdateButton className={cx(styles.sideButton, styles.update)}>
            <Icons.SyncAlt className={styles.sideIcon} />
          </DatabaseUpdateButton>
        </div>
        <CurrentSongProgress />
      </div>
      <div className={cx(styles.section, styles.progress)}>
        <Volume />
      </div>
    </div>
  )
}

export default BottomPanel
