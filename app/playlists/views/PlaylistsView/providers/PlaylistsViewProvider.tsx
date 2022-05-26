import React, { useEffect, useRef, useCallback, useMemo } from 'react'
import { useRouteMatch } from 'react-router-dom'

import * as R from 'ramda'

import Change from '@app/changes/types/Change'
import Handler from '@app/common/types/Handler'
import DatabaseFile from '@app/database/data/DatabaseFile'

import PlaylistsViewContext from '@app/playlists/views/PlaylistsView/contexts/PlaylistsViewContext'

import useChanges from '@app/changes/use/useChanges'
import useRemoteList from '@app/common/use/useRemoteList'
import usePlaylistsViewNavigation from '@app/playlists/views/PlaylistsView/use/usePlaylistsViewNavigation'

import PlaylistsApi from '@app/playlists/api'

import route from '@app/playlists/views/PlaylistsView/route'

const PlaylistsViewProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    items: playlists,
    load: loadPlaylists,
    state: playlistRemoteState
  } = useRemoteList(PlaylistsApi.get)

  useEffect(() => {
    loadPlaylists()
  }, [loadPlaylists])

  const filesCacheRef = useRef(new Map<string, ReadonlyArray<DatabaseFile>>())

  const retrieveFiles = useCallback(
    async (name: string): Promise<ReadonlyArray<DatabaseFile>> => {
      const cached = filesCacheRef.current.get(name)

      if (!R.isNil(cached)) {
        return cached
      }

      const items = await PlaylistsApi.files.get({ name })

      filesCacheRef.current.set(name, items)

      return items
    },
    []
  )

  const {
    items: selectedPlaylistFiles,
    load: loadSelectedPlaylistFiles,
    reset: resetSelectedPlaylistFiles
  } = useRemoteList(retrieveFiles)

  const handleChanges: Handler<ReadonlyArray<Change>> = useCallback((changes) => {
    if (!changes.includes('stored_playlist')) {
      return
    }

    filesCacheRef.current.clear()

    loadPlaylists()
  }, [loadPlaylists])

  useChanges(handleChanges)

  const selectedPlaylistName = useRouteMatch<{ [route.match.param]: string }>({
    path: route.match.pattern
  })?.params?.[route.match.param]

  const selectedPlaylist = R.find(
    R.propEq('name', selectedPlaylistName),
    playlists
  )

  const { goHome } = usePlaylistsViewNavigation()

  useEffect(() => {
    if (R.isNil(selectedPlaylist)) {
      if (playlistRemoteState === 'success' && !R.isNil(selectedPlaylistName)) {
        goHome()
      }

      resetSelectedPlaylistFiles()

      return
    }

    loadSelectedPlaylistFiles(selectedPlaylist.name)
  }, [selectedPlaylist, selectedPlaylistName, playlistRemoteState, goHome, loadSelectedPlaylistFiles, resetSelectedPlaylistFiles])

  const value = useMemo(() => ({
    playlists,
    selection: R.isNil(selectedPlaylist) ? null : {
      playlist: selectedPlaylist,
      files: selectedPlaylistFiles
    }
  }), [playlists, selectedPlaylist, selectedPlaylistFiles])

  return (
    <PlaylistsViewContext.Provider value={value}>
      {children}
    </PlaylistsViewContext.Provider>
  )
}

export default PlaylistsViewProvider
