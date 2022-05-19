import React, { useCallback, useLayoutEffect, memo } from 'react'

import * as R from 'ramda'

import DatabaseItem from '@app/database/data/DatabaseItem'

import DatabaseDirectory from '@app/database/components/DatabaseDirectory'

import useScrollable from '@app/common/use/useScrollable'
import useDatabaseViewContext from '@app/database/views/DatabaseView/use/useDatabaseViewContext'
import useDatabaseViewNavigation from '@app/database/views/DatabaseView/use/useDatabaseViewNavigation'

import route from './route'

import styles from './styles.scss'

const DatabaseView = memo(() => {
  const [containerRef, containerScrollable] = useScrollable<HTMLDivElement>()

  const { directories, onSelectedItemChange } = useDatabaseViewContext()

  useLayoutEffect(() => {
    containerScrollable.scrollRight('auto')
  }, [directories, containerScrollable])

  const { goTo, goBack } = useDatabaseViewNavigation()

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
    <div ref={containerRef} className={styles.container}>
      <For of={directories} body={(directory, index) => (
        <DatabaseDirectory
          key={directory.uri}
          isActive={isActive(index)}
          items={directory.items}
          selectedItem={directory.selectedItem}
          onAscent={handleAscent}
          onDescent={handleDescent}
        />
      )} />
    </div>
  )
})

export { route }

export default DatabaseView
