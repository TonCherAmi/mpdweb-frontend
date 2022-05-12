import * as R from 'ramda'

import PlaylistItem from '@app/playlist/dto/PlaylistItem'

import useStatusContext from '@app/status/use/useStatusContext'
import usePlaylistContext from '@app/playlist/use/usePlaylistContext'

const useCurrentSong = (): Nullable<PlaylistItem> => {
  const status = useStatusContext()
  const playlist = usePlaylistContext()

  if (R.isNil(status.song)) {
    return null
  }

  return playlist[status.song.position]
}

export default useCurrentSong
