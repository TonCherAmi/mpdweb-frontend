import React, { memo } from 'react'

import Playlist from '@app/playlists/data/Playlist'
import DatabaseFile from '@app/database/data/DatabaseFile'

import * as Icons from '@app/common/icons'

import Button from '@app/common/components/Button'
import Duration from '@app/common/components/Duration'

import useQueueActions from '@app/queue/use/useQueueActions'

import { getPluralSuffix } from '@app/common/utils/format'

import { getTotalDuration } from './utils'

import styles from './styles.scss'

interface Props {
  playlist: Playlist
  files: ReadonlyArray<DatabaseFile>
}

const formatUpdatedAt = (playlist: Playlist): string => {
  const dateText = new Date(playlist.updatedAt).toLocaleDateString()

  return `Last Updated on ${dateText}`
}

const formatFilesCount = (files: ReadonlyArray<DatabaseFile>): string => {
  return `${files.length} track${getPluralSuffix(files.length)}`
}

const PlaylistHeader = memo(({ playlist, files }: Props) => {
  const totalDuration = getTotalDuration(files)

  const { add, replace } = useQueueActions()

  const handleAddClick = () => {
    add(playlist)
  }

  const handlePlayClick = () => {
    replace(playlist)
  }

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h2 className={styles.name}>
          {playlist.name}
        </h2>
        <span className={styles.count}>
          {formatFilesCount(files)}
          {', '}
        </span>
        <Duration
          className={styles.duration}
          value={totalDuration}
          format="descriptive"
        />
        <span className={styles.updated}>
          {formatUpdatedAt(playlist)}
        </span>
      </div>
      <div className={styles.buttons}>
        <Button className={styles.button} onClick={handleAddClick}>
          <Icons.Plus className={styles.icon} />
          Add
        </Button>
        <Button className={styles.button} onClick={handlePlayClick}>
          <Icons.PlayFill className={styles.icon} />
          Play
        </Button>
      </div>
    </div>
  )
})

export default PlaylistHeader
