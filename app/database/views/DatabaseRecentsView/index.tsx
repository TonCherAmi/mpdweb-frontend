import React, { useEffect } from 'react'

import * as R from 'ramda'

import DatabaseRecentsGroup from '@app/database/components/DatabaseRecentsGroup'

import useRemoteList from '@app/common/use/useRemoteList'
import useDatabaseVersionContext from '@app/database/use/useDatabaseVersionContext'

import { groupByDate, formatGroupHeading, sortGroup } from '@app/database/views/DatabaseRecentsView/utils'

import DatabaseApi from '@app/database/api'

import route from './route'

import styles from './styles.scss'

const DatabaseRecentsView = () => {
  const databaseVersion = useDatabaseVersionContext()

  const { items, load } = useRemoteList(DatabaseApi.recents)

  useEffect(() => {
    load()
  }, [databaseVersion, load])

  const grouped = R.toPairs(groupByDate(items))

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        Recently Added
      </h1>
      <div className={styles.groups}>
        <For of={grouped} body={([date, group]) => {
          const title = formatGroupHeading(new Date(date))

          const sorted = sortGroup(group)

          return <DatabaseRecentsGroup key={title} title={title} items={sorted} />
        }} />
      </div>
    </div>
  )
}

export { route }

export default DatabaseRecentsView
