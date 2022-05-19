import React, { ChangeEventHandler, MouseEventHandler } from 'react'

import cx from 'classnames'

import Handler from '@app/common/types/Handler'

import styles from './styles.scss'

interface Props {
  inputClassName?: string
  containerClassName?: string
  leftBackgroundClassName?: string
  rightBackgroundClassName?: string
  disabled?: boolean
  min: number
  max: number
  step?: number
  value: number
  onChange: Handler<number>
}

const Range = ({
  inputClassName,
  containerClassName,
  leftBackgroundClassName,
  rightBackgroundClassName,
  disabled,
  min,
  max,
  value,
  onChange,
  ...props
}: Props) => {
  const exactPercentage = disabled ? 0 : (value / (max - min)) * 100

  const percentage = exactPercentage > 99 ? 100 : exactPercentage

  const leftBackgroundStyle = {
    flexBasis: `${percentage}%`
  }

  const rightBackgroundStyle = {
    flexBasis: `${100 - percentage}%`
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.target.valueAsNumber)
  }

  const handleMouseUp: MouseEventHandler<HTMLInputElement> = (event) => {
    event.currentTarget.blur()
  }

  return (
    <div className={cx(styles.container, containerClassName)}>
      <div
        style={leftBackgroundStyle}
        className={cx(styles.background, styles.left, leftBackgroundClassName)}
      />
      <div
        style={rightBackgroundStyle}
        className={cx(styles.background, styles.right, rightBackgroundClassName)}
      />
      <input
        className={cx(styles.range, inputClassName)}
        disabled={disabled}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        onMouseUp={handleMouseUp}
        {...props}
      />
    </div>
  )
}

export default Range
