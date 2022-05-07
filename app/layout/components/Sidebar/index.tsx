import React, { memo } from 'react'

import { useLocation } from 'react-router-dom'

import cx from 'classnames'

import Link from '@app/common/components/Link'
import CurrentCoverArt from '@app/status/components/CurrentCoverArt'

import { items, SidebarItem } from './items'

import styles from './styles.scss'

interface Props {
  items: SidebarItem[]
}

const Sidebar = memo((props: Props) => {
  const location = useLocation()

  const getIsActive = (path: string) => {
    return location.pathname.startsWith(path)
  }

  return (
    <div className={styles.container}>
      <For of={props.items} body={({ icon: Icon, ...item }) => (
        <Link
          key={item.path}
          className={cx(styles.item, { [styles.active]: getIsActive(item.path) })}
          to={item.path}
        >
          <Icon className={styles.icon} /> {item.text}
        </Link>
      )} />
      <CurrentCoverArt className={styles.cover} />
    </div>
  )
})

const SidebarWithItems = memo(() => (
  <Sidebar items={items} />
))

export default SidebarWithItems
