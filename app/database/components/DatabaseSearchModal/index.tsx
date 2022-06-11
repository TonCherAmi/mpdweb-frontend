import React, { useRef, memo } from 'react'

import useModal from '@app/ui/use/useModal'

import Modal from '@app/common/components/Modal'
import DatabaseSearch from '@app/database/components/DatabaseSearch'

import styles from './styles.scss'

export const DATABASE_SEARCH_MODAL_ID = 'DatabaseSearchModal'

const DatabaseSearchModal = memo(() => {
  const preservedStateRef = useRef({
    term: '',
    results: [],
    currentItem: null,
  })

  const { isOpen, close } = useModal(DATABASE_SEARCH_MODAL_ID)

  return (
    <Modal className={styles.container} isOpen={isOpen} onClose={close}>
      <DatabaseSearch
        preservedStateRef={preservedStateRef}
        onSuccess={close}
      />
    </Modal>
  )
})

export default DatabaseSearchModal
