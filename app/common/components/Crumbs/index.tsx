import React from 'react'

import Link from '@app/common/components/Link'

import styles from './styles.scss'

export interface Crumb {
  path: string
  label: string
}

interface Props {
  list: Crumb[]
}

const Crumbs = ({ list }: Props) => {
  return (
    <For of={list} body={(item) => (
      <span key={item.path} className={styles.crumb}>
        <Link className={styles.link} to={item.path}>
          {item.label}
        </Link>
      </span>
    )} />
  )
}

export default Crumbs
