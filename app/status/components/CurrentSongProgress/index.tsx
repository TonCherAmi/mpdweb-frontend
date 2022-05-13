import React, { memo, useRef, useState, useEffect } from 'react'

import Change from '@app/changes/types/Change'
import Handler from '@app/common/types/Handler'

import Duration from '@app/common/components/Duration'
import SongProgressRange from '@app/status/components/CurrentSongProgressRange'

import useDebounce from '@app/common/use/useDebounce'
import useStatusContext from '@app/status/use/useStatusContext'
import useChangesSubscriptionRegistryContext from '@app/changes/use/useChangesSubscriptionRegistryContext'

import PlaybackService from '@app/playback/services/PlaybackService'

import { totalSecondsToDuration } from '@app/common/utils/duration'

import styles from './styles.scss'

const SEEK_DEBOUNCE_WAIT_MS = 250

const CurrentSongProgress = memo(() => {
  const status = useStatusContext()

  const shouldIgnoreStatusUpdatesRef = useRef(false)

  const totalElapsedSeconds = status.song?.elapsed?.total?.seconds ?? 0

  const [value, setValue] = useState(totalElapsedSeconds)

  useEffect(() => {
    if (!shouldIgnoreStatusUpdatesRef.current) {
      setValue(totalElapsedSeconds)
    }
  }, [totalElapsedSeconds])

  const [seek] = useDebounce((time: number) => {
    PlaybackService.seek(time)
  }, SEEK_DEBOUNCE_WAIT_MS)

  const changesSubscriptionRegistry = useChangesSubscriptionRegistryContext()

  useEffect(() => {
    const handler: Handler<ReadonlyArray<Change>> = (changes) => {
      if (changes.includes('player')) {
        shouldIgnoreStatusUpdatesRef.current = false
      }
    }

    changesSubscriptionRegistry.subscribe(handler)

    return () => {
      changesSubscriptionRegistry.unsubscribe(handler)
    }
  }, [changesSubscriptionRegistry])

  const handleChange = (value: number) => {
    shouldIgnoreStatusUpdatesRef.current = true

    setValue(value)

    seek(value)
  }

  const isDisabled = status.state === 'STOPPED'

  return (
    <div className={styles.container}>
      <Duration className={styles.duration} value={totalSecondsToDuration(value)} />
      <SongProgressRange
        disabled={isDisabled}
        max={status.song?.duration?.total?.seconds ?? 0}
        value={value}
        onChange={handleChange}
      />
      <Duration className={styles.duration} value={status.song?.duration} />
    </div>
  )
})

export default CurrentSongProgress
