import React from 'react'

import DatabaseFile from '@app/database/data/DatabaseFile'

import DatabaseCoverArt from '@app/database/components/DatabaseCoverArt'

import useDatabaseCoverArtModal from '@app/database/use/useDatabaseCoverArtModal'
import useDatabaseViewNavigation from '@app/database/views/DatabaseView/use/useDatabaseViewNavigation'
import useDatabaseRecentsItemContextMenu
  from '@app/database/components/DatabaseRecentsItem/use/useDatabaseRecentsItemContextMenu'

import { dirname } from '@app/common/utils/path'
import { formatDatabaseTags } from '@app/database/utils/format'

import styles from './styles.scss'

interface Props {
  item: DatabaseFile
}

const DatabaseRecentsItem = ({ item }: Props) => {
  const { goTo } = useDatabaseViewNavigation()

  const { open: openCoverArtModal } = useDatabaseCoverArtModal(item.uri)

  const handleClick = () => {
    goTo(dirname(item.uri))
  }

  const handleCoverArtClick: React.MouseEventHandler = (e) => {
    e.stopPropagation()

    openCoverArtModal()
  }

  const { handleContextMenu } = useDatabaseRecentsItemContextMenu(item)

  const tags = formatDatabaseTags(item.tags)

  return (
    <div className={styles.container} onClick={handleClick} onContextMenu={handleContextMenu}>
      <DatabaseCoverArt
        className={styles.cover}
        fallbackIconClassName={styles.icon}
        uri={item.uri}
        onClick={handleCoverArtClick}
      />
      <div className={styles.tags}>
        <div className={styles.title}>
          <span className={styles.title}>{tags.title}</span>
        </div>
        <div className={styles.artist}>
          <span className={styles.artist}>{tags.artist}</span>
        </div>
        <div className={styles.album}>
          <span className={styles.album}>{tags.album}</span>
        </div>
      </div>
    </div>
  )
}

export default DatabaseRecentsItem
