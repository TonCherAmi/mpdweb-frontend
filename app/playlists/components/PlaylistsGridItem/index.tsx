import React, { memo } from 'react'

import cx from 'classnames'

import Handler from '@app/common/types/Handler'
import Playlist from '@app/playlists/data/Playlist'

import * as Icons from '@app/common/icons'

import Link from '@app/common/components/Link'

import usePlaylistsViewNavigation from '@app/playlists/views/PlaylistsView/use/usePlaylistsViewNavigation'
import usePlaylistGridItemContextMenu
  from '@app/playlists/components/PlaylistsGridItem/use/usePlaylistGridItemContextMenu'

import styles from './styles.scss'

interface Props {
  isSelected: boolean
  playlist: Playlist
  onRemoveClick: Handler<Playlist>
}

const PlaylistsGridItem = memo(({ isSelected, playlist, onRemoveClick }: Props) => {
  const { getPathTo } = usePlaylistsViewNavigation()

  const to = getPathTo(playlist.name)

  const { handleContextMenu } = usePlaylistGridItemContextMenu({ playlist, onRemoveClick })

  return (
    <Link
      className={cx(styles.link, { [styles.selected]: isSelected })}
      to={to}
      onContextMenu={handleContextMenu}
    >
      <div className={styles.cover}>
        <Icons.Playlist className={styles.icon} />
      </div>
      <span className={styles.name}>
        {playlist.name}
      </span>
    </Link>
  )
})

export default PlaylistsGridItem
