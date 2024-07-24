import { useMemo } from 'react'

import useDatabaseItemLabelActions from '@app/labels/use/useDatabaseItemLabelActions'
import useDatabaseItemLabelsContext from '@app/labels/use/useDatabaseItemLabelsContext'
import { FAVORITE_DATABASE_ITEM_LABEL_DATA } from '@app/labels/utils/types'

interface Actions {
  favorite: (uri: string) => void
  unfavorite: (id: string) => void
}

const useFavoritesActions = (): Actions => {
  const { create, remove } = useDatabaseItemLabelActions()
  const [, loadDatabaseItemLabels] = useDatabaseItemLabelsContext()

  return useMemo(() => {
    const favorite = async (uri: string) => {
      await create({ uri, ...FAVORITE_DATABASE_ITEM_LABEL_DATA })

      void loadDatabaseItemLabels()
    }

    const unfavorite = async (id: string) => {
      await remove(id)

      void loadDatabaseItemLabels()
    }

    return { favorite, unfavorite }
  }, [create, remove, loadDatabaseItemLabels])
}

export default useFavoritesActions
