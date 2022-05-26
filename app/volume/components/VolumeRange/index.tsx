import React, { memo, useState, useEffect } from 'react'

import cx from 'classnames'

import Range from '@app/common/components/Range'

import useStatusContext from '@app/status/use/useStatusContext'

import VolumeService from '@app/volume/services/VolumeService'

import useThrottle from '@app/common/use/useThrottle'

import styles from './styles.scss'

const VOLUME_SET_THROTTLE_WAIT_MS = 25

const VolumeRange = memo(() => {
  const status = useStatusContext()

  const [value, setValue] = useState(status.volume)

  useEffect(() => {
    setValue(status.volume)
  }, [status.volume])

  const set = useThrottle((value: number) => {
    VolumeService.set(value)
  }, VOLUME_SET_THROTTLE_WAIT_MS)

  const handleChange = (value: number) => {
    setValue(value)

    set(value)
  }

  return (
    <Range
      inputClassName={styles.input}
      containerClassName={styles.container}
      leftBackgroundClassName={cx(styles.background, styles.left)}
      rightBackgroundClassName={cx(styles.background, styles.right)}
      min={0}
      max={100}
      value={value}
      onChange={handleChange}
    />
  )
})

export default VolumeRange
