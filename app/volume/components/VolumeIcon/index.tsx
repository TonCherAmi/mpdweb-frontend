import React, { useEffect, useRef } from 'react'

import * as Icons from '@app/common/icons'

import Button from '@app/common/components/Button'

import useVolumeContext from '@app/volume/use/useVolumeContext'

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
  const { value, set } = useVolumeContext()

  const previousVolumeRef = useRef(value)

  useEffect(() => {
    if (value === 0) {
      return
    }

    previousVolumeRef.current = value
  }, [value])

  const handleClick = () => {
    const volume = value !== 0
      ? 0
      : previousVolumeRef.current

    set(volume)
  }

  const Icon = getIcon(value)

  return (
    <Button className={styles.button} onClick={handleClick}>
      <Icon className={styles.icon} />
    </Button>
  )
}

export default VolumeIcon
