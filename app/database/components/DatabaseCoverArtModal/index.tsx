import React from 'react'

import Thunk from '@app/common/types/Thunk'
import DatabaseFile from '@app/database/data/DatabaseFile'

import Modal from '@app/common/components/Modal'
import DatabaseCoverArt from '@app/database/components/DatabaseCoverArt'

import styles from './styles.scss'

interface Props {
  file: DatabaseFile
  onClose: Thunk
}

const DatabaseCoverArtModal = ({ file, onClose }: Props) => {
  return (
    <Modal className={styles.container} onClose={onClose}>
      <DatabaseCoverArt className={styles.cover} file={file} />
    </Modal>
  )
}

export default DatabaseCoverArtModal
