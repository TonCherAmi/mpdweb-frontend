import React, { useEffect } from 'react'

import Change from '@app/changes/types/Change'
import Handler from '@app/common/types/Handler'

import useRemoteList from '@app/common/use/useRemoteList'
import useChangesSubscriptionRegistryContext from '@app/changes/use/useChangesSubscriptionRegistryContext'

import PlaylistContext from '@app/playlist/contexts/PlaylistContext'

import PlaylistApi from '@app/playlist/api'

const PlaylistProvider = ({ children }: { children: React.ReactNode }) => {
  const { load, items } = useRemoteList(PlaylistApi.get)

  useEffect(() => {
    load()
  }, [load])

  const changesSubscriptionRegistry = useChangesSubscriptionRegistryContext()

  useEffect(() => {
    const handler: Handler<ReadonlyArray<Change>> = (changes) => {
      if (changes.includes('playlist')) {
        load()
      }
    }

    changesSubscriptionRegistry.subscribe(handler)

    return () => {
      changesSubscriptionRegistry.unsubscribe(handler)
    }
  }, [changesSubscriptionRegistry, load])

  return (
    <PlaylistContext.Provider value={items}>
      {children}
    </PlaylistContext.Provider>
  )
}

export default PlaylistProvider
