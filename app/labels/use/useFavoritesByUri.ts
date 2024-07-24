import { useMemo } from 'react'

import * as R from 'ramda'

import DatabaseItemLabel from '@app/labels/data/api/DatabaseItemLabel'

import useDatabaseItemLabelsContext from '@app/labels/use/useDatabaseItemLabelsContext'

import { isFavoriteDatabaseItemLabel } from '@app/labels/utils/types'

const useFavoritesByUri = (): Record<string, DatabaseItemLabel> => {
  const [databaseItemLabelsByUri] = useDatabaseItemLabelsContext()

  return useMemo(() => {
    if (R.isNil(databaseItemLabelsByUri)) {
      return {}
    }

    const favoritesByUri = R.mapObjIndexed((labels) => {
      return labels.find(isFavoriteDatabaseItemLabel)
    }, databaseItemLabelsByUri)

    return R.reject(R.isNil, favoritesByUri)
  }, [databaseItemLabelsByUri])
}

export default useFavoritesByUri
