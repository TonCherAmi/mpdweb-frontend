import React, { memo } from 'react'

import cx from 'classnames'

import useStatusContext from '@app/status/use/useStatusContext'

import * as Icons from '@app/common/icons'

import PlaybackPrevButton from '@app/playback/components/PlaybackPrevButton'
import PlaybackNextButton from '@app/playback/components/PlaybackNextButton'
import PlaybackStopButton from '@app/playback/components/PlaybackStopButton'
import PlaybackToggleButton from '@app/playback/components/PlaybackToggleButton'

import styles from './styles.scss'

const PlaybackControls = memo(() => {
  const status = useStatusContext()

  return (
    <div className={styles.group}>
      <PlaybackPrevButton className={styles.button}>
        <Icons.SkipForwardFill className={cx(styles.icon, styles.prev)} />
      </PlaybackPrevButton>
      <PlaybackToggleButton className={cx(styles.button, styles.toggle)}>
        <Choose>
          <When condition={status.state === 'PLAYING'}>
            <Icons.Pause className={styles.icon} />
          </When>
          <Otherwise>
            <Icons.PlayFill className={styles.icon} />
          </Otherwise>
        </Choose>
      </PlaybackToggleButton>
      <PlaybackStopButton className={cx(styles.button, styles.stop)}>
        <Icons.StopFill className={styles.icon} />
      </PlaybackStopButton>
      <PlaybackNextButton className={styles.button}>
        <Icons.SkipForwardFill className={cx(styles.icon, styles.next)} />
      </PlaybackNextButton>
    </div>
  )
})

export default PlaybackControls
