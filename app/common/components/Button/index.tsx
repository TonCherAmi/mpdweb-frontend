import React from 'react'

import cx from 'classnames'

import styles from './styles.scss'

interface ButtonProps {
  className?: string
  onClick: React.EventHandler<React.MouseEvent>
}

const Button = ({
  className,
  children,
  onClick,
  ...props
}: React.PropsWithChildren<ButtonProps>) => {
  return (
    <button
      {...props}
      className={cx(styles.button, className)}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
