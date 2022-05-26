import React from 'react'

import * as R from 'ramda'

import * as Icons from '@app/common/icons'

import Button from '@app/common/components/Button'
import PlaylistList from '@app/playlists/components/PlaylistList'
import PlaylistsSearchInput from '@app/playlists/components/PlaylistListSearchInput'

import useItemSearch from '@app/common/use/useItemSearch'

import styles from './styles.scss'

type Props = React.ComponentProps<typeof PlaylistList>

const playlistNameAccessor = R.prop('name')

const Playlists = ({ playlists, selectedPlaylist }: Props) => {
  const itemSearch = useItemSearch(playlists, playlistNameAccessor)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Playlists
        </h2>
        <Button className={styles.button} onClick={() => null}>
          <Icons.Plus className={styles.icon} />
        </Button>
      </div>
      <div className={styles.header}>
        <PlaylistsSearchInput
          value={itemSearch.input.value}
          onChange={itemSearch.input.handleChange}
        />
      </div>
      <div className={styles.scrollable}>
        <PlaylistList playlists={itemSearch.results} selectedPlaylist={selectedPlaylist} />
      </div>
    </div>
  )
}

export default Playlists
