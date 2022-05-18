import React from 'react'

import cx from 'classnames'

import * as Icons from '@app/common/icons'

import Volume from '@app/volume/components/Volume'
import CurrentSong from '@app/status/components/CurrentSong'
import PlaybackControls from '@app/playback/components/PlaybackControls'
import CurrentSongProgress from '@app/status/components/CurrentSongProgress'
import QueueClearButton from '@app/queue/components/QueueClearButton'
import DatabaseUpdateButton from '@app/database/components/DatabaseUpdateButton'
import PlaybackSingleButton from '@app/playback/components/PlaybackSingleButton'
import PlaybackRandomButton from '@app/playback/components/PlaybackRandomButton'
import PlaybackRepeatButton from '@app/playback/components/PlaybackRepeatButton'
import PlaybackConsumeButton from '@app/playback/components/PlaybackConsumeButton'

import styles from './styles.scss'

const BottomPanel = () => {
  return (
    <div className={styles.panel}>
      <div className={cx(styles.section, styles.song)}>
        <CurrentSong />
      </div>
      <div className={cx(styles.section, styles.controls)}>
        <div className={styles.buttons}>
          <QueueClearButton className={cx(styles.sideButton, styles.clear)}>
            <Icons.TimesCircleFill className={styles.sideIcon} />
          </QueueClearButton>
          <PlaybackControls />
          <DatabaseUpdateButton className={cx(styles.sideButton, styles.update)}>
            <Icons.SyncAlt className={styles.sideIcon} />
          </DatabaseUpdateButton>
        </div>
        <CurrentSongProgress />
      </div>
      <div className={cx(styles.section, styles.progress)}>
        <Volume />
        <div className={styles.options}>
          <PlaybackRepeatButton />
          <PlaybackRandomButton />
          <PlaybackSingleButton />
          <PlaybackConsumeButton />
        </div>
      </div>
    </div>
  )
}

export default BottomPanel
