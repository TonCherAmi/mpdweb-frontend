import React, { memo } from 'react'

import Handler from '@app/common/types/Handler'
import PlaylistItemDto from '@app/playlist/dto/PlaylistItem'

import Duration from '@app/common/components/Duration'
import DatabaseCoverArt from '@app/database/components/DatabaseCoverArt'

import usePlaylistItemContextMenu from '@app/playlist/use/usePlaylistItemContextMenu'

import styles from './styles.scss'

interface Props {
  item: PlaylistItemDto
  onClick?: Handler<PlaylistItemDto>
}

const PlaylistItem = memo(({ item, onClick }: Props) => {
  const handleClick = () => {
    onClick?.(item)
  }

  const { handleContextMenu } = usePlaylistItemContextMenu(item)

  return (
    <div
      className={styles.container}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      <DatabaseCoverArt
        className={styles.cover}
        fallbackIconClassName={styles.icon}
        file={item}
      />
      <div className={styles.name}>
        <span className={styles.title} title={item.title ?? ''}>
          {item.title}
        </span>
        <span className={styles.artist} title={item.artist ?? ''}>
          {item.artist}
        </span>
      </div>
      <Duration className={styles.duration} value={item.duration} />
    </div>
  )
})

export default PlaylistItem
