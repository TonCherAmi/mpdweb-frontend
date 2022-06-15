import React from 'react'

import Thunk from '@app/common/types/Thunk'

import Modal from '@app/common/components/Modal'
import DatabaseSearch from '@app/database/components/DatabaseSearch'

import styles from './styles.scss'

const DatabaseSearchModal = ({ onClose }: { onClose: Thunk }) => {
  return (
    <Modal className={styles.container} onClose={onClose}>
      <DatabaseSearch onSuccess={onClose} />
    </Modal>
  )
}

export default DatabaseSearchModal
