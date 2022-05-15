import React from 'react'

import cx from 'classnames'

import styles from './styles.scss'

interface Props extends React.ComponentProps<'button'> {
  className?: string
  onClick: React.MouseEventHandler
  children: React.ReactNode
}

const Button  = ({ className, children, onClick, ...props }: Props) => {
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
