import React, { useEffect, useRef } from 'react'

import * as Icons from '@app/common/icons'

import Button from '@app/common/components/Button'

import useStatusContext from '@app/status/use/useStatusContext'

import VolumeService from '@app/volume/services/VolumeService'

import styles from './styles.scss'

const getIcon = (volume: number): React.ElementType => {
  if (volume === 0) {
    return Icons.VolumeMute
  }

  if (volume > 60) {
    return Icons.VolumeUp
  }

  return Icons.VolumeDown
}

const VolumeIcon = () => {
  const status = useStatusContext()

  const previousVolumeRef = useRef(status.volume)

  useEffect(() => {
    if (status.volume === 0) {
      return
    }

    previousVolumeRef.current = status.volume
  }, [status.volume])

  const handleClick = () => {
    const volume = status.volume !== 0
      ? 0
      : previousVolumeRef.current

    VolumeService.set(volume)
  }

  const Icon = getIcon(status.volume)

  return (
    <Button className={styles.button} onClick={handleClick}>
      <Icon className={styles.icon} />
    </Button>
  )
}

export default VolumeIcon
