import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import Thunk from '@app/common/types/Thunk'

import { joinPath } from '@app/common/utils/path'

import route from '@app/playlists/views/PlaylistsView/route'

interface PlaylistViewNavigation {
  goTo: (name: string) => void
  goHome: Thunk
  getPathTo: (name: string) => string
}

const getPathTo = (name: string): string => (
  joinPath([route.path, name])
)

const usePlaylistsViewNavigation = (): PlaylistViewNavigation => {
  const history = useHistory()

  const goTo = useCallback((name: string) => {
    history.push(
      joinPath([route.path, name])
    )
  }, [history])

  const goHome = useCallback(() => {
    history.push(route.path)
  }, [history])

  return { goTo, goHome, getPathTo }
}

export default usePlaylistsViewNavigation
