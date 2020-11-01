import React from 'react'

import cx from 'classnames'

import styles from './styles.scss'

interface StopButtonProps {
  onClick: React.EventHandler<React.MouseEvent>
}

const StopButton = ({ onClick }: StopButtonProps) => (
  <div className={cx(styles.button, styles.stop)} onClick={onClick}>
    <svg width="3em" height="3em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z" />
    </svg>
  </div>
)

export default StopButton
