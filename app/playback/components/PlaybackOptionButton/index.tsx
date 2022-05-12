import React from 'react'

import cx from 'classnames'

import Thunk from '@app/common/types/Thunk'

import * as Icons from '@app/common/icons'

import Button from '@app/common/components/Button'

import styles from './styles.scss'

interface Props {
  className?: string
  icon: keyof typeof Icons
  title?: string
  onClick: Thunk
}

const PlaybackOptionButton = ({ className, icon, title, onClick }: Props) => {
  const Icon = Icons[icon]

  return (
    <Button
      className={cx(styles.button, className)}
      title={title}
      onClick={onClick}
    >
      <Icon className={styles.icon} />
    </Button>
  )
}

export default PlaybackOptionButton
