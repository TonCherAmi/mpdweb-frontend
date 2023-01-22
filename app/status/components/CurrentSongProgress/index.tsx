import React, { memo, useRef, useState, useEffect } from 'react'

import Duration from '@app/common/components/Duration'
import SongProgressRange from '@app/status/components/CurrentSongProgressRange'

import useDebounce from '@app/common/use/useDebounce'
import useStatusContext from '@app/status/use/useStatusContext'
import usePlaybackActions from '@app/playback/use/usePlaybackActions'
import useCurrentSongElapsedContext from '@app/status/use/useCurrentSongElapsedContext'

import { totalSecondsToDuration, DURATION_ZERO } from '@app/common/utils/duration'

import styles from './styles.scss'

const SEEK_DEBOUNCE_WAIT_MS = 350

const CurrentSongProgress = memo(() => {
  const status = useStatusContext()

  const shouldIgnoreExternalUpdatesRef = useRef(false)

  const totalElapsedSeconds = useCurrentSongElapsedContext()

  const [value, setValue] = useState(totalElapsedSeconds)

  useEffect(() => {
    if (!shouldIgnoreExternalUpdatesRef.current) {
      setValue(totalElapsedSeconds)
    }
  }, [totalElapsedSeconds])

  useEffect(() => {
    shouldIgnoreExternalUpdatesRef.current = false
  }, [status.song?.elapsed?.total?.seconds])

  const { seek } = usePlaybackActions()

  const [seekDebounced] = useDebounce((time: number) => {
    seek(time)
  }, SEEK_DEBOUNCE_WAIT_MS)

  const handleChange = (value: number) => {
    shouldIgnoreExternalUpdatesRef.current = true

    setValue(value)

    seekDebounced(value)
  }

  const isDisabled = status.state === 'stopped'

  return (
    <div className={styles.container}>
      <Duration className={styles.duration} value={totalSecondsToDuration(value)} />
      <SongProgressRange
        disabled={isDisabled}
        max={status.song?.duration?.total?.seconds ?? 0}
        value={value}
        onChange={handleChange}
      />
      <Duration
        className={styles.duration}
        value={status.song?.duration ?? DURATION_ZERO}
      />
    </div>
  )
})

export default CurrentSongProgress
