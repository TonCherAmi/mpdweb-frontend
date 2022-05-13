import React from 'react'

import cx from 'classnames'

import Range from '@app/common/components/Range'

import styles from './styles.scss'

import Handler from '@app/common/types/Handler'

interface Props {
  disabled: boolean
  max: number
  value: number
  onChange: Handler<number>
}

const SongProgressRange = ({ disabled, max, value, onChange }: Props) => {
  return (
    <Range
      inputClassName={styles.input}
      containerClassName={styles.container}
      leftBackgroundClassName={cx(styles.background, styles.left, { [styles.disabled]: disabled })}
      rightBackgroundClassName={cx(styles.background, styles.right, { [styles.disabled]: disabled })}
      disabled={disabled}
      min={0}
      max={max}
      step={1}
      value={value}
      onChange={onChange}
    />
  )
}

export default SongProgressRange
