import React from 'react'

import * as Icons from '@app/common/icons'

import SearchInput from '@app/common/components/SearchInput'

import styles from './styles.scss'

type Props = Omit<React.ComponentPropsWithoutRef<typeof SearchInput>, 'className'>

const DatabaseSearchInput = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <div className={styles.container}>
      <Icons.Search className={styles.icon} />
      <SearchInput ref={ref} className={styles.input} {...props} />
    </div>
  )
})

export default DatabaseSearchInput
