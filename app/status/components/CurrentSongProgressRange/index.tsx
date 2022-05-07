import React, { memo, useState, useEffect, useRef } from 'react'

import * as R from 'ramda'

import cx from 'classnames'

import Range from '@app/common/components/Range'

import useDebounce from '@app/common/use/useDebounce'
import useStatusContext from '@app/status/use/useStatusContext'
import useChangesSubscriptionRegistryContext from '@app/changes/use/useChangesSubscriptionRegistryContext'

import PlaybackService from '@app/playback/services/PlaybackService'

import styles from './styles.scss'
import Handler from '@app/common/types/Handler'
import Change from '@app/changes/types/Change'

const SEEK_DEBOUNCE_WAIT_MS = 250

const CurrentSongProgressRange = memo(() => {
  const status = useStatusContext()

  const shouldIgnoreStatusUpdatesRef = useRef(false)

  const totalElapsedSeconds = status?.elapsed.total.seconds ?? 0

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

  if (R.isNil(status)) {
    return null
  }

  const isDisabled = status.state === 'STOPPED'

  return (
    <Range
      inputClassName={styles.input}
      containerClassName={styles.container}
      leftBackgroundClassName={cx(styles.background, styles.left, { [styles.disabled]: isDisabled })}
      rightBackgroundClassName={cx(styles.background, styles.right, { [styles.disabled]: isDisabled })}
      disabled={isDisabled}
      min={0}
      max={status?.duration.total.seconds ?? 0}
      step={1}
      value={value}
      onChange={handleChange}
    />
  )
})

export default CurrentSongProgressRange
