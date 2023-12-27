import * as R from 'ramda'

import Playlist from '@app/playlists/data/Playlist'
import DatabaseFile from '@app/database/data/DatabaseFile'
import { ItemListNavigation } from '@app/common/use/useItemListNavigation'

import usePlaylistActions from '@app/playlists/use/usePlaylistActions'
import useFocusScopeGroupedKeybindings from '@app/keybindings/use/useFocusScopeGroupedKeybindings'

const usePlaylistFileListKeybindings = (
  playlist: Playlist,
  itemListNavigation: ItemListNavigation<DatabaseFile>
) => {
  const { removeSongs } = usePlaylistActions()

  useFocusScopeGroupedKeybindings({
    REMOVE: () => {
      if (R.isNil(itemListNavigation.currentItemIndex)) {
        return
      }

      removeSongs(playlist, [itemListNavigation.currentItemIndex])
    },
  })
}

export default usePlaylistFileListKeybindings
