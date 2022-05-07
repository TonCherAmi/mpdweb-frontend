import React, { memo } from 'react'

import Handler from '@app/common/types/Handler'
import PlaylistItemDto from '@app/playlist/dto/PlaylistItem'

import Duration from '@app/common/components/Duration'
import DatabaseCoverArt from '@app/database/components/DatabaseCoverArt'

import styles from './styles.scss'

interface Props {
  item: PlaylistItemDto
  onClick?: Handler<PlaylistItemDto>
}

const PlaylistItem = memo(({ item, onClick }: Props) => {
  const handleClick = () => {
    onClick?.(item)
  }

  return (
    <div className={styles.container} onClick={handleClick}>
      <DatabaseCoverArt
        className={styles.cover}
        fallbackIconClassName={styles.icon}
        file={item}
      />
      <div className={styles.name}>
        <span className={styles.title}>
          {item.title}
        </span>
        <span className={styles.artist}>
          {item.artist}
        </span>
      </div>
      <Duration className={styles.duration} value={item.duration} />
    </div>
  )
})

export default PlaylistItem
