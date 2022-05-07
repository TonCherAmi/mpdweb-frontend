import React from 'react'

import * as R from 'ramda'

import * as Icons from '@app/common/icons'

import useStatusContext from '@app/status/use/useStatusContext'

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

  if (R.isNil(status)) {
    return null
  }

  const Icon = getIcon(status.volume)

  return (
    <Icon className={styles.icon} />
  )
}

export default VolumeIcon
