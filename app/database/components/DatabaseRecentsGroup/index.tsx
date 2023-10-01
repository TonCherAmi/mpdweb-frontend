import React from 'react'

import cx from 'classnames'

import DatabaseFile from '@app/database/data/DatabaseFile'

import * as Icons from '@app/common/icons'

import Button from '@app/common/components/Button'
import DatabaseRecentsItem from '@app/database/components/DatabaseRecentsItem'

import useQueueActions from '@app/queue/use/useQueueActions'

import styles from './styles.scss'

interface Props {
  title: string
  items: ReadonlyArray<DatabaseFile>
}

const DatabaseRecentsGroup = ({ title, items }: Props) => {
  const { add, replace } = useQueueActions()

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          {title}
        </h3>
        <div className={styles.controls}>
          <Button className={cx(styles.button, styles.add)} onClick={() => add(items)}>
            <Icons.PlusSquareFill className={styles.icon} />
          </Button>
          <Button className={cx(styles.button, styles.replace)} onClick={() => replace(items)}>
            <Icons.PlayFill className={styles.icon} />
          </Button>
        </div>
      </div>
      <div className={styles.entries}>
        <For of={items} body={(item) => (
          <DatabaseRecentsItem key={item.uri} item={item} />
        )} />
      </div>
    </div>
  )
}

export default DatabaseRecentsGroup
