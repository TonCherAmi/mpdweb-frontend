import React, { useEffect, useCallback, useMemo } from 'react'

import * as R from 'ramda'

import DatabaseItem from '@app/database/data/DatabaseItem'
import DatabaseDirectory from '@app/database/views/DatabaseView/types/DatabaseDirectory'

import useStatic from '@app/common/use/useStatic'
import useRemoteList from '@app/common/use/useRemoteList'
import useFullMatchParam from '@app/common/use/useFullMatchParam'
import useDatabaseVersionContext from '@app/database/use/useDatabaseVersionContext'

import DatabaseViewContext from '@app/database/views/DatabaseView/contexts/DatabaseViewContext'

import { dirname } from '@app/common/utils/path'
import { DATABASE_ROOT_URI, subpaths } from '@app/database/views/DatabaseView/utils'
import { INITIAL_DATABASE_VERSION } from '@app/database/contexts/DatabaseVersionContext'

import route from '@app/database/views/DatabaseView/route'

import DatabaseApi from '@app/database/api'

const DatabaseViewProvider = ({ children }: { children: React.ReactNode }) => {
  const matchUri = useFullMatchParam(route)

  const uris = useMemo(() => (
    [DATABASE_ROOT_URI, ...subpaths(matchUri ?? DATABASE_ROOT_URI)]
  ), [matchUri])

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

          const items = await DatabaseApi.get({ uri })
          const count = await DatabaseApi.count({ uri })

          const selectedItem = getSelectedItem(items)
            ?? R.head(items)

          if (R.isNil(selectedItem)) {
            throw Error('selected item cannot be null')
          }

          const databaseDirectory = { items, count, selectedItem }

          cache.set(uri, databaseDirectory)

          return { ...databaseDirectory, uri }
        }
      )
    )
  }, [cache])

  const { load, items } = useRemoteList(retrieve)

  const databaseVersion = useDatabaseVersionContext()

  useEffect(() => {
    if (databaseVersion === INITIAL_DATABASE_VERSION) {
      return
    }

    cache.clear()
  }, [databaseVersion, cache])

  useEffect(() => {
    if (databaseVersion === INITIAL_DATABASE_VERSION) {
      return
    }

    load(uris)
  }, [uris, databaseVersion, load])

  const onSelectedItemChange = useCallback((item: DatabaseItem) => {
    const directoryUri = dirname(item.uri)
      ?? DATABASE_ROOT_URI

    const cached = cache.get(directoryUri)

    if (!R.isNil(cached)) {
      cached.selectedItem = item
    }
  }, [cache])

  const value = useMemo(() => ({
    directories: items,
    onSelectedItemChange,
  }), [items, onSelectedItemChange])

  return (
    <DatabaseViewContext.Provider value={value}>
      {children}
    </DatabaseViewContext.Provider>
  )
}

export default DatabaseViewProvider
