import React from 'react'

import * as R from 'ramda'

import SearchInput, { Props as SearchInputProps } from '@app/common/components/SearchInput'

import * as Icons from '@app/common/icons'

import styles from './styles.scss'

type Props = Omit<SearchInputProps, 'className'>

const DatabaseSearch: React.FC<Props> = (props: Props) => {
  const searchInputProps = R.omit(['children'], props)

  return (
    <div className={styles.container}>
      <Icons.Search className={styles.icon} />
      <SearchInput
        className={styles.input}
        {...searchInputProps}
      />
    </div>
  )
}

export default DatabaseSearch
