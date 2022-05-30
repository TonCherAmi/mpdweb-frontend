import React from 'react'

import cx from 'classnames'

import Thunk from '@app/common/types/Thunk'

import Button from '@app/common/components/Button'

import styles from './styles.scss'

export interface Crumb {
  label: string
  onClick: Thunk
}

interface Props {
  classNames?: {
    container?: string
    item?: string
  }
  items: ReadonlyArray<Crumb>
}

const Crumbs = ({ classNames, items }: Props) => {
  return (
    <div className={cx(styles.container, classNames?.container)}>
      <For of={items} body={(item, index) => (
        <div className={styles.crumb}>
          <Button
            key={index + item.label}
            className={cx(styles.button, classNames?.item)}
            onClick={item.onClick}
          >
            {item.label}
          </Button>
        </div>
      )} />
    </div>
  )
}

export default Crumbs
