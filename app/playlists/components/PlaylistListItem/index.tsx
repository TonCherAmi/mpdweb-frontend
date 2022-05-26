import React, { memo } from 'react'

import cx from 'classnames'

import Handler from '@app/common/types/Handler'
import Playlist from '@app/playlists/data/Playlist'

import * as Icons from '@app/common/icons'

import Button from '@app/common/components/Button'

import { withPropagationStopped } from '@app/common/utils/event'

import usePlaylistListItemContextMenu from './use/usePlaylistListItemContextMenu'

import styles from './styles.scss'

interface Props {
  isActive: boolean
  playlist: Playlist
  onClick: Handler<Playlist>
  onAddClick: Handler<Playlist>
  onPlayClick: Handler<Playlist>
  onRemoveClick: Handler<Playlist>
}

const PlaylistListItem = memo(({
  isActive,
  playlist,
  onClick,
  onAddClick,
  onPlayClick,
  onRemoveClick
}: Props) => {
  const handleClick = () => {
    onClick(playlist)
  }

  const handleAddClick = withPropagationStopped(() => {
    onAddClick(playlist)
  })

  const handlePlayClick = withPropagationStopped(() => {
    onPlayClick(playlist)
  })

  const { handleContextMenu } = usePlaylistListItemContextMenu({ playlist, onRemoveClick })

  return (
    <div
      className={cx(styles.container, { [styles.active]: isActive })}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      <Icons.MusicNoteList className={cx(styles.icon, styles.playlist)} />
      <span className={styles.name} title={playlist.name}>
        {playlist.name}
      </span>
      <div className={styles.controls}>
        <Button className={styles.button} onClick={handleAddClick}>
          <Icons.PlusSquareFill className={cx(styles.icon, styles.add)} />
        </Button>
        <Button className={styles.button} onClick={handlePlayClick}>
          <Icons.PlayFill className={cx(styles.icon, styles.play)} />
        </Button>
      </div>
    </div>
  )
})

export default PlaylistListItem
