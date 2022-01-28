import React, { useState, useEffect, useCallback, useMemo } from 'react'

import * as R from 'ramda'

import Handler from '@app/common/types/Handler'
import Change from '@app/changes/dto/enums/Change'
import DatabaseItem from '@app/database/dto/DatabaseItem'
import DatabaseDirectory from '@app/database/views/DatabaseView/types/DatabaseDirectory'

import useStatic from '@app/common/use/useStatic'
import useRemoteList from '@app/common/use/useRemoteList'
import useFullMatchParam from '@app/common/use/useFullMatchParam'
import useChangesSubscriptionRegistryContext from '@app/changes/use/useChangesSubscriptionRegistryContext'

import DatabaseViewContext from '@app/database/views/DatabaseView/contexts/DatabaseViewContext'

import { dirname } from '@app/common/utils/path'
import { DATABASE_ROOT_URI, subpaths } from '@app/database/views/DatabaseView/utils'

import route from '@app/database/views/DatabaseView/route'

import DatabaseApi from '@app/database/api'

const DatabaseViewProvider = ({ children }: { children: React.ReactNode }) => {
  const matchUri = useFullMatchParam(route)

  const [uris, setUris] = useState<ReadonlyArray<string>>([])

  useEffect(() => {
    setUris([DATABASE_ROOT_URI, ...subpaths(matchUri ?? DATABASE_ROOT_URI)])
  }, [matchUri])

  const cache = useStatic(() => new Map<string, Omit<DatabaseDirectory, 'uri'>>())

  const retrieve = useCallback((uris: ReadonlyArray<string>) => {
    return Promise.all(
      uris.map(
        async (uri, index) => {
          const getSelectedItem = (items: ReadonlyArray<DatabaseItem>): Nullable<DatabaseItem> => {
            const nextUri = index === uris.length - 1 ? null : uris[index + 1]

            return R.find(
              R.propEq('uri', nextUri),
              items
            )
          }

          const cached = cache.get(uri)

          if (!R.isNil(cached)) {
            cached.selectedItem = getSelectedItem(cached.items)
              ?? cached.selectedItem

            return { ...cached, uri }
          }

          const items = await DatabaseApi.get({ uri: uri })

          const selectedItem = getSelectedItem(items)
            ?? R.head(items)

          if (R.isNil(selectedItem)) {
            throw Error('selected item cannot be null')
          }

          const databaseDirectory = { items, selectedItem }

          cache.set(uri, databaseDirectory)

          return { ...databaseDirectory, uri }
        }
      )
    )
  }, [cache])

  const { load, items } = useRemoteList(retrieve)

  const changesSubscriptionRegistry = useChangesSubscriptionRegistryContext()

  useEffect(() => {
    const handler: Handler<ReadonlyArray<Change>> = (changes) => {
      if (changes.includes(Change.DATABASE)) {
        cache.clear()

        load(uris)
      }
    }

    changesSubscriptionRegistry.subscribe(handler)

    return () => {
      changesSubscriptionRegistry.unsubscribe(handler)
    }
  }, [changesSubscriptionRegistry, cache, load, uris])

  useEffect(() => {
    load(uris)
  }, [uris, load])

  const onSelectedItemChange = useCallback((databaseItem: DatabaseItem) => {
    const directoryUri = dirname(databaseItem.uri)
      ?? DATABASE_ROOT_URI

    const cached = cache.get(directoryUri)

    if (!R.isNil(cached)) {
      cached.selectedItem = databaseItem
    }
  }, [cache])

  const value = useMemo(() => ({
    directories: items,
    onSelectedItemChange
  }), [items, onSelectedItemChange])

  return (
    <DatabaseViewContext.Provider value={value}>
      {children}
    </DatabaseViewContext.Provider>
  )
}

export default DatabaseViewProvider