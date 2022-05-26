import React, { useEffect, useCallback } from 'react'

import Change from '@app/changes/types/Change'

import useChanges from '@app/changes/use/useChanges'
import useRemoteList from '@app/common/use/useRemoteList'

import QueueContext from '@app/queue/contexts/QueueContext'

import QueueApi from '@app/queue/api'

const QueueProvider = ({ children }: { children: React.ReactNode }) => {
  const { load, items } = useRemoteList(QueueApi.get)

  useEffect(() => {
    load()
  }, [load])

  const handleChanges = useCallback((changes: ReadonlyArray<Change>) => {
    if (changes.includes('playlist')) {
      load()
    }
  }, [load])

  useChanges(handleChanges)

  return (
    <QueueContext.Provider value={items}>
      {children}
    </QueueContext.Provider>
  )
}

export default QueueProvider
