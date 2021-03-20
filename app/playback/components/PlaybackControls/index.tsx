import React from 'react'

import { observer } from 'mobx-react'

import cx from 'classnames'

import * as R from 'ramda'

import * as Icons from '@app/common/icons'

import PlaybackPrevButton from '@app/playback/components/PlaybackPrevButton'
import PlaybackNextButton from '@app/playback/components/PlaybackNextButton'
import PlaybackStopButton from '@app/playback/components/PlaybackStopButton'
import PlaybackToggleButton from '@app/playback/components/PlaybackToggleButton'

import StatusStore from '@app/status/stores/StatusStore'

import styles from './styles.scss'

const PlaybackControls: React.FC = () => {
  if (R.isNil(StatusStore.status)) {
    return null
  }

  return (
    <div className={styles.group}>
      <PlaybackPrevButton className={styles.button}>
        <Icons.SkipBackwardFill className={cx(styles.icon, styles.prev)} />
      </PlaybackPrevButton>
      <PlaybackToggleButton className={cx(styles.button, styles.toggle)}>
        <Choose>
          <When condition={StatusStore.isPlaying}>
            <Icons.Pause className={styles.icon} />
          </When>
          <Otherwise>
            <Icons.PlayFill className={styles.icon} />
          </Otherwise>
        </Choose>
      </PlaybackToggleButton>
      <PlaybackStopButton className={styles.button}>
        <Icons.StopFill className={styles.icon} />
      </PlaybackStopButton>
      <PlaybackNextButton className={styles.button}>
        <Icons.SkipForwardFill className={cx(styles.icon, styles.next)} />
      </PlaybackNextButton>
    </div>
  )
}

export default observer(PlaybackControls)
