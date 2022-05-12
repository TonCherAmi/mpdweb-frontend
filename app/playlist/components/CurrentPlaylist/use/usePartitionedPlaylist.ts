import * as R from 'ramda'

import PlaylistItem from '@app/playlist/dto/PlaylistItem'

import useStatusContext from '@app/status/use/useStatusContext'
import usePlaylistContext from '@app/playlist/use/usePlaylistContext'

interface PartitionedPlaylist {
  prev: ReadonlyArray<PlaylistItem>
  next: ReadonlyArray<PlaylistItem>
}

const usePartitionedPlaylist = (): PartitionedPlaylist => {
  const status = useStatusContext()
  const playlist = usePlaylistContext()

  const playlistWithoutCurrentSong = R.reject(
    R.propEq('position', status.song?.position),
    playlist
  )

  const [prev, next] = R.partition((item) => {
    return item.position < (status.song?.position ?? -1)
  }, playlistWithoutCurrentSong)

  return { prev, next }
}

export default usePartitionedPlaylist
