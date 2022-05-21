import React, { memo } from 'react'

import { useLocation } from 'react-router-dom'

import cx from 'classnames'

import Link from '@app/common/components/Link'
import SidebarHeader from '@app/layout/components/SidebarHeader'
import CurrentCoverArt from '@app/status/components/CurrentCoverArt'

import { items, SidebarItem } from './items'

import styles from './styles.scss'

interface Props {
  items: SidebarItem[]
}

const Sidebar = memo((props: Props) => {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname.startsWith(path)
  }

  return (
    <div className={styles.container}>
      <SidebarHeader />
      <For of={props.items} body={({ icon: Icon, ...item }) => (
        <Link
          key={item.path}
          className={cx(styles.item, { [styles.active]: isActive(item.path) })}
          to={item.path}
        >
          <Icon className={styles.icon} /> {item.text}
        </Link>
      )} />
      <CurrentCoverArt className={styles.cover} fallbackIconClassName={styles.icon} />
    </div>
  )
})

const SidebarWithItems = memo(() => (
  <Sidebar items={items} />
))

export default SidebarWithItems
