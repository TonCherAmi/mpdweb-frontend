import React from 'react'

import Thunk from '@app/common/types/Thunk'

import * as Icons from '@app/common/icons'

import Button from '@app/common/components/Button'
import Crumbs, { Crumb } from '@app/common/components/Crumbs'

import styles from './styles.scss'

interface Props {
  crumbs: ReadonlyArray<Crumb>
  onHomeClick: Thunk
}

const crumbsClassNames: React.ComponentProps<typeof Crumbs>['classNames'] = {
  container: styles.crumbs,
  item: styles.crumb
}

const DatabaseViewHeader = ({ crumbs, onHomeClick }: Props) => {
  return (
    <div className={styles.container}>
      <Button onClick={onHomeClick}>
        <Icons.House className={styles.icon} />
      </Button>
      <Crumbs classNames={crumbsClassNames} items={crumbs} />
    </div>
  )
}

export default DatabaseViewHeader
