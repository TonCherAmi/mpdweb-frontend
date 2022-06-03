import React, { useCallback, useLayoutEffect, memo } from 'react'

import * as R from 'ramda'

import DatabaseItem from '@app/database/data/DatabaseItem'

import DatabaseDirectory from '@app/database/components/DatabaseDirectory'
import DatabaseViewHeader from '@app/database/components/DatabaseViewHeader'

import useScrollable from '@app/common/use/useScrollable'
import useDatabaseViewCrumbs from '@app/database/views/DatabaseView/use/useDatabaseViewCrumbs'
import useDatabaseViewContext from '@app/database/views/DatabaseView/use/useDatabaseViewContext'
import useDatabaseViewNavigation from '@app/database/views/DatabaseView/use/useDatabaseViewNavigation'

import { DATABASE_ROOT_URI } from './utils'

import route from './route'

import styles from './styles.scss'

const DatabaseView = memo(() => {
  const [directoriesContainerRef, directoriesContainerScrollable] = useScrollable<HTMLDivElement>()

  const { directories, onSelectedItemChange } = useDatabaseViewContext()

  useLayoutEffect(() => {
    directoriesContainerScrollable.scrollRight('auto')
  }, [directories, directoriesContainerScrollable])

  const { goTo, goBack } = useDatabaseViewNavigation()

  const [crumbs, handleDatabaseDirectoryRef] = useDatabaseViewCrumbs(directories)

  const handleHomeClick = useCallback(() => {
    directoriesContainerScrollable.scrollLeft('smooth')
  }, [directoriesContainerScrollable])

  const handleAscent = useCallback((databaseItem: DatabaseItem) => {
    onSelectedItemChange(databaseItem)

    goBack()
  }, [goBack, onSelectedItemChange])

  const handleDescent = useCallback((databaseItem: DatabaseItem) => {
    onSelectedItemChange(databaseItem)

    goTo(databaseItem.uri)
  }, [goTo, onSelectedItemChange])

  const isActive = R.equals<Nullable<number>>(directories.length - 1)

  return (
    <div className={styles.container}>
      <DatabaseViewHeader crumbs={crumbs} onHomeClick={handleHomeClick} />
      <div ref={directoriesContainerRef} className={styles.directories}>
        <For of={directories} body={(directory, index) => (
          <DatabaseDirectory
            key={directory.uri}
            uri={directory.uri}
            isActive={isActive(index)}
            items={directory.items}
            selectedItem={directory.selectedItem}
            onRef={handleDatabaseDirectoryRef}
            onAscent={handleAscent}
            onDescent={handleDescent}
          />
        )} />
      </div>
    </div>
  )
})

export { route }

export default DatabaseView
