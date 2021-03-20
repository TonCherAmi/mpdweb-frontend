import React from 'react'

import cx from 'classnames'

import styles from './styles.scss'

interface Props {
  className?: string
  onClick: React.EventHandler<React.MouseEvent>
}

const Button: React.FC<Props> = ({ className, children, onClick, ...props }) => {
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
