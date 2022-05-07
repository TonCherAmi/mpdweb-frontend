import React, { memo, useState, useEffect } from 'react'

import cx from 'classnames'

import * as R from 'ramda'

import Range from '@app/common/components/Range'

import useStatusContext from '@app/status/use/useStatusContext'

import VolumeService from '@app/volume/services/VolumeService'

import useDebounce from '@app/common/use/useDebounce'

import styles from './styles.scss'

const VOLUME_SET_DEBOUNCE_WAIT_MS = 25

const VolumeRange = memo(() => {
  const status = useStatusContext()

  const volume = status?.volume ?? 0

  const [value, setValue] = useState(volume)

  useEffect(() => {
    setValue(volume)
  }, [volume])

  const [set] = useDebounce((value: number) => {
    VolumeService.set(value)
  }, VOLUME_SET_DEBOUNCE_WAIT_MS)

  const handleChange = (value: number) => {
    setValue(value)

    set(value)
  }

  if (R.isNil(status)) {
    return null
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
