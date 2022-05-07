import React from 'react'

import VolumeIcon from '@app/volume/components/VolumeIcon'
import VolumeRange from '@app/volume/components/VolumeRange'

import styles from './styles.scss'

const Volume = () => {
  return (
    <div className={styles.container}>
      <VolumeIcon />
      <VolumeRange />
    </div>
  )
}

export default Volume
