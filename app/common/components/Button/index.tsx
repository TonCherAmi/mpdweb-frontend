import React from 'react'

import cx from 'classnames'

import { withPropagationStopped } from '@app/common/utils/event'

import styles from './styles.scss'

interface ButtonProps {
  className?: string,
  shouldStopPropagation?: boolean,
  onClick: React.EventHandler<React.MouseEvent>,
  children: React.ReactChildren
}

const Button = ({ className, shouldStopPropagation, onClick, children, ...props }: ButtonProps) => {
  const handleClick = shouldStopPropagation
    ? withPropagationStopped(onClick)
    : onClick

  return (
    <button
      {...props}
      type="button"
      className={cx(styles.button, className)}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

export default Button
