import * as R from 'ramda'

import DatabaseFile from '@app/database/dto/DatabaseFile'

import useStatusContext from '@app/status/use/useStatusContext'
import usePlaylistContext from '@app/playlist/use/usePlaylistContext'

const useCurrentSong = (): Nullable<DatabaseFile> => {
  const status = useStatusContext()
  const playlist = usePlaylistContext()

  if (R.isNil(status) || R.isNil(status.song)) {
    return null
  }

  return playlist[status.song?.position]
}

export default useCurrentSong
