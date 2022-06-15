import React from 'react'

import * as Icons from '@app/common/icons'

import Button from '@app/common/components/Button'

import useKeybindings from '@app/keybindings/use/useKeybindings'
import useCanOpenModal from '@app/ui/use/useCanOpenModal'
import useDatabaseSearchModal from '@app/database/use/useDatabaseSearchModal'

import styles from './styles.scss'

const SidebarHeader = () => {
  const { open: openModal } = useDatabaseSearchModal()

  const canOpenModal = useCanOpenModal()

  useKeybindings({
    DATABASE_SEARCH_MODAL: openModal,
  }, { disable: !canOpenModal })

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>MusicPD</h1>
      <Button onClick={openModal}>
        <Icons.Search className={styles.icon} />
      </Button>
    </div>
  )
}

export default SidebarHeader
