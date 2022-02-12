import * as R from 'ramda'

import DatabaseFile from '@app/database/dto/DatabaseFile'

import useStatusContext from '@app/status/use/useStatusContext'
import usePlaylistContext from '@app/playlist/use/usePlaylistContext'

const useCurrentSong = (): Nullable<DatabaseFile> => {
  const status = useStatusContext()
  const playlist = usePlaylistContext()

  if (R.isNil(status) || R.isNil(status.currentSong)) {
    return null
  }

  return playlist[status.currentSong]
}

export default useCurrentSong
