import React from 'react'

import * as Icons from '@app/common/icons'

import Button from '@app/common/components/Button'

import useModalStateContext from '@app/ui/use/useModalStateContext'

import { DATABASE_SEARCH_MODAL_ID } from '@app/database/components/DatabaseSearchModal'

import styles from './styles.scss'

const SidebarHeader = () => {
  const [, setActiveModalId] = useModalStateContext()

  const handleClick = () => {
    setActiveModalId(DATABASE_SEARCH_MODAL_ID)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>MusicPD</h1>
      <Button onClick={handleClick}>
        <Icons.Search className={styles.icon} />
      </Button>
    </div>
  )
}

export default SidebarHeader
