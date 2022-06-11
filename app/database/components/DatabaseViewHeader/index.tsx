import React from 'react'

import Thunk from '@app/common/types/Thunk'
import DatabaseCount from '@app/database/data/DatabaseCount'

import * as Icons from '@app/common/icons'

import Button from '@app/common/components/Button'
import Duration from '@app/common/components/Duration'
import Crumbs, { Crumb } from '@app/common/components/Crumbs'

import { DURATION_ZERO } from '@app/common/utils/duration'
import { getPluralSuffix } from '@app/common/utils/format'

import styles from './styles.scss'

interface Props {
  crumbs: ReadonlyArray<Crumb>
  count: Nullable<DatabaseCount>
  onHomeClick: Thunk
}

const crumbsClassNames: React.ComponentProps<typeof Crumbs>['classNames'] = {
  container: styles.crumbs,
  item: styles.crumb,
}

const DatabaseViewHeader = ({ crumbs, count, onHomeClick }: Props) => {
  const songCount = count?.songCount ?? 0

  return (
    <div className={styles.container}>
      <Button onClick={onHomeClick}>
        <Icons.House className={styles.icon} />
      </Button>
      <Crumbs classNames={crumbsClassNames} items={crumbs} />
      <div className={styles.count}>
        {songCount} track{getPluralSuffix(songCount)}
        <br/>
        <Duration value={count?.playtime ?? DURATION_ZERO} format="descriptive" />
      </div>
    </div>
  )
}

export default DatabaseViewHeader
