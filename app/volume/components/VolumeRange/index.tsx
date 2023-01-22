import React, { memo } from 'react'

import cx from 'classnames'

import Range from '@app/common/components/Range'

import useVolumeContext from '@app/volume/use/useVolumeContext'

import styles from './styles.scss'

const VolumeRange = memo(() => {
  const { value, set } = useVolumeContext()

  return (
    <Range
      inputClassName={styles.input}
      containerClassName={styles.container}
      leftBackgroundClassName={cx(styles.background, styles.left)}
      rightBackgroundClassName={cx(styles.background, styles.right)}
      min={0}
      max={100}
      value={value}
      onChange={set}
    />
  )
})

export default VolumeRange
