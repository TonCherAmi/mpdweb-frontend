import React from 'react'

import QueueContext from '@app/queue/contexts/QueueContext'
import StatusContext from '@app/status/contexts/StatusContext'
import ChannelActionContext from '@app/channel/contexts/ChannelActionContext'
import DatabaseVersionContext from '@app/database/contexts/DatabaseVersionContext'
import PlaylistsVersionContext from '@app/playlists/contexts/PlaylistsVersionContext'

import useChannel from '@app/channel/use/useChannel'

const ChannelProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    perform,
    status,
    queue,
    databaseVersion,
    playlistsVersion,
  } = useChannel()

  return (
    <ChannelActionContext.Provider value={perform}>
      <DatabaseVersionContext.Provider value={databaseVersion}>
        <PlaylistsVersionContext.Provider value={playlistsVersion}>
          <StatusContext.Provider value={status}>
            <QueueContext.Provider value={queue}>
              {children}
            </QueueContext.Provider>
          </StatusContext.Provider>
        </PlaylistsVersionContext.Provider>
      </DatabaseVersionContext.Provider>
    </ChannelActionContext.Provider>
  )
}

export default ChannelProvider
