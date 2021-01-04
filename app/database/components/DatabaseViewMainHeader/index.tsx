import React from 'react'

import Button from '@app/common/components/Button'

import * as Icons from '@app/common/icons'

import styles from './styles.scss'

interface DatabaseViewMainHeaderProps {
  uri: string
  onHomeClick: React.EventHandler<React.MouseEvent>
  onBackClick: React.EventHandler<React.MouseEvent>
}

const DatabaseViewMainHeader = ({
  uri,
  onHomeClick,
  onBackClick
}: DatabaseViewMainHeaderProps) => {
  return (
    <div className={styles.container}>
      <h2>{uri}</h2>
      <div className={styles.controls}>
        <Button onClick={onBackClick}>
          <Icons.ArrowAltCircleLeftFill className={styles.icon} />
        </Button>
        <Button onClick={onHomeClick}>
          <Icons.HomeFill className={styles.icon} />
        </Button>
      </div>
    </div>
  )
}

export default DatabaseViewMainHeader
