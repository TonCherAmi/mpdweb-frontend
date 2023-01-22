import React from 'react'

import Thunk from '@app/common/types/Thunk'

import Modal from '@app/common/components/Modal'
import DatabaseCoverArt from '@app/database/components/DatabaseCoverArt'

import styles from './styles.scss'

interface Props {
  uri: string
  onClose: Thunk
}

const DatabaseCoverArtModal = ({ uri, onClose }: Props) => {
  return (
    <Modal className={styles.container} onClose={onClose}>
      <DatabaseCoverArt className={styles.cover} uri={uri} />
    </Modal>
  )
}

export default DatabaseCoverArtModal
