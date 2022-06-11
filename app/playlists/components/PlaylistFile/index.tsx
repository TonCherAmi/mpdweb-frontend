import React, { memo } from 'react'

import Handler from '@app/common/types/Handler'
import DatabaseFile from '@app/database/data/DatabaseFile'

import Duration from '@app/common/components/Duration'
import DatabaseCoverArt from '@app/database/components/DatabaseCoverArt'

import usePlaylistFileContextMenu from './use/usePlaylistFileContextMenu'

import styles from './styles.scss'

interface Props {
  file: DatabaseFile
  position: number
  onClick: Handler<DatabaseFile>
  onRemoveClick: Handler<number>
}

const getOrPlaceholder = (string: Nullable<string>) => string ?? '-'

const PlaylistFile = memo(({ file, position, onClick, onRemoveClick }: Props) => {
  const handleClick = () => {
    onClick(file)
  }

  const { handleContextMenu } = usePlaylistFileContextMenu({
    file,
    position,
    onRemoveClick,
  })

  return (
    <div
      className={styles.container}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      <DatabaseCoverArt
        className={styles.cover}
        fallbackIconClassName={styles.icon}
        file={file}
      />
      <div className={styles.tags}>
        <div className={styles.tag}>
          <span className={styles.title} title={getOrPlaceholder(file.title)}>
            {getOrPlaceholder(file.title)}
          </span>
        </div>
        <div className={styles.tag}>
          <span className={styles.artist} title={getOrPlaceholder(file.artist)}>
            {getOrPlaceholder(file.artist)}
          </span>
        </div>
        <div className={styles.tag}>
          <span className={styles.album} title={getOrPlaceholder(file.album)}>
            {getOrPlaceholder(file.album)}
          </span>
        </div>
      </div>
      <Duration className={styles.duration} value={file.duration} />
    </div>
  )
})

export default PlaylistFile
