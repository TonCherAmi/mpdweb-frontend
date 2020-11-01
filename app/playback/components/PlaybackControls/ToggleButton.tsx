import React from 'react'

import cx from 'classnames'

import styles from './styles.scss'

interface ToggleButtonProps {
  isPlaying: boolean,
  onClick: React.EventHandler<React.MouseEvent>
}

const ToggleButton = ({ isPlaying, onClick }: ToggleButtonProps) => (
  <div className={cx(styles.button, styles.toggle)} onClick={onClick}>
    <Choose >
      <When condition={isPlaying}>
        <svg width="3rem" height="3rem" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
        </svg>
      </When>
      <Otherwise>
        <svg width="3rem" height="3rem" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
        </svg>
      </Otherwise>
    </Choose>
  </div>
)

export default ToggleButton
