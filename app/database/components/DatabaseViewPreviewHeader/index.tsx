import React from 'react'

import * as R from 'ramda'

import DatabaseItem from '@app/database/dto/DatabaseItem'
import DatabaseCount from '@app/database/dto/DatabaseCount'

import * as Icons from '@app/common/icons'

import Duration from '@app/common/components/Duration'

import { getTitle, getSubtitle } from './utils'

import styles from './styles.scss'

interface Props {
  item: Nullable<DatabaseItem>
  count: Nullable<DatabaseCount>
}

const DatabaseViewPreviewHeader = ({ item, count }: Props) => {
  if (R.isNil(item) || R.isNil(count)) {
    return null
  }

  const title = getTitle(item)
  const subtitle = getSubtitle(item)

  return (
    <div className={styles.container}>
      <div className={styles.subcontainer}>
        <span className={styles.title}>
          {title}
        </span>
        <span className={styles.subtitle}>
          {subtitle}
        </span>
      </div>
      <span className={styles.duration}>
        <Icons.ClockFill className={styles.icon} />
        <Duration value={count.playtime}/>
      </span>
    </div>
  )
}

export default DatabaseViewPreviewHeader
