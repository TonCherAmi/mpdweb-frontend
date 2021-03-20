import React from 'react'

import cx from 'classnames'

import * as Icons from '@app/common/icons'

import Link from '@app/common/components/Link'

import styles from './styles.scss'

const Sidebar: React.FC = () => {
  return (
    <div className={styles.container}>
      <Link className={cx(styles.item, styles.active)} to="/database">
        <Icons.FolderFill className={styles.icon} /> Files
      </Link>
      <div className={styles.item}>
        <Icons.HeartFill className={styles.icon} /> Favorites
      </div>
      <div className={styles.item}>
        <Icons.MusicNoteList className={styles.icon} /> Playlists
      </div>
      <div className={styles.item}>
        <Icons.Search className={styles.icon} /> Search
      </div>
    </div>
  )
}

export default Sidebar
