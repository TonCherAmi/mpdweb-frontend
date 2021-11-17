import React from 'react'

import * as R from 'ramda'

import DatabaseItem from '@app/database/dto/DatabaseItem'

import { RemoteDataState } from '@app/common/stores/RemoteDataStore'

import * as Icons from '@app/common/icons'

import Spinner from '@app/common/components/Spinner'

import styles from './styles.scss'

interface Props {
  state: RemoteDataState
  term: string
  minTermLength: number
  items: DatabaseItem[]
}

const DatabaseSearchViewItemsPlaceholder: React.FC<Props> = ({
  state,
  term,
  minTermLength,
  items
}) => {
  return (
    <div className={styles.container}>
      <Choose>
        <When condition={state === RemoteDataState.LOADING}>
          <Spinner />
        </When>
        <When condition={term.length < minTermLength}>
          <Icons.Search className={styles.icon} />
          <span className={styles.text}>
            Input {minTermLength - term.length} or more characters
            <br/>
            to start searching
          </span>
        </When>
        <When condition={state === RemoteDataState.LOADED && R.isEmpty(items)}>
          <Icons.Search className={styles.icon} />
          <span className={styles.text}>
            No results
          </span>
        </When>
      </Choose>
    </div>
  )
}

export default DatabaseSearchViewItemsPlaceholder
