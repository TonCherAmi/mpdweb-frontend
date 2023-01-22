import { useCallback, useState, useReducer } from 'react'

import * as R from 'ramda'

import Action from '@app/channel/data/Action'
import Update from '@app/channel/data/Update'
import Handler from '@app/common/types/Handler'
import Response from '@app/channel/data/Response'
import Fallible from '@app/common/types/Fallible'
import QueueItem from '@app/queue/data/QueueItem'
import StatusData from '@app/status/data/Status'

import useConnection, { Event } from '@app/channel/use/useConnection'

import { INITIAL_DATABASE_VERSION } from '@app/database/contexts/DatabaseVersionContext'
import { INITIAL_PLAYLISTS_VERSION } from '@app/playlists/contexts/PlaylistsVersionContext'

export interface Channel {
  perform: (action: Action) => Response
  status: Nullable<Fallible<StatusData>>
  queue: Nullable<Fallible<ReadonlyArray<QueueItem>>>
  databaseVersion: number
  playlistsVersion: number
}

const useChannel = (): Channel => {
  const [status, setStatus] = useState<Nullable<Fallible<StatusData>>>(null)
  const [queue, setQueue] = useState<Nullable<Fallible<ReadonlyArray<QueueItem>>>>(null)
  const [databaseVersion, incrementDatabaseVersion] = useReducer(R.inc, INITIAL_DATABASE_VERSION)
  const [playlistsVersion, incrementPlaylistsVersion] = useReducer(R.inc, INITIAL_PLAYLISTS_VERSION)

  const handleEvent: Handler<Event> = useCallback((event) => {
    const reset = (message: string) => {
      const error = { status: 'error', message } as const

      setStatus(error)
      setQueue(error)
    }

    switch (event.type) {
      case 'status': {
        if (event.data === 'closed') {
          reset('Connection closed')
        }

        break
      }

      case 'update': {
        const data = event.data as Update

        if (R.isNil(data.items) || data.code !== 0) {
          reset(data.message ?? 'Unknown error')

          return
        }

        data.items.forEach((item) => {
          switch (item.type) {
            case 'db': {
              incrementDatabaseVersion()

              break
            }

            case 'playlists': {
              incrementPlaylistsVersion()

              break
            }

            case 'status': {
              setStatus({ status: 'ok', data: item.data })

              break
            }

            case 'queue':
              setQueue({ status: 'ok', data: item.data })

              break
          }
        })

        break
      }
    }
  }, [])

  const perform = useConnection(handleEvent) as unknown as Channel['perform']

  return {
    perform,
    status,
    queue,
    databaseVersion,
    playlistsVersion,
  }
}

export default useChannel
