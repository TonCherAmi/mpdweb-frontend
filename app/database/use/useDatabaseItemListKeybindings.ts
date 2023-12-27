import * as R from 'ramda'

import DatabaseItem from '@app/database/data/DatabaseItem'
import { ItemListNavigation } from '@app/common/use/useItemListNavigation'

import useQueueActions from '@app/queue/use/useQueueActions'
import useDatabaseActions from '@app/database/use/useDatabaseActions'
import useFocusScopeGroupedKeybindings from '@app/keybindings/use/useFocusScopeGroupedKeybindings'

const useDatabaseItemListKeybindings = <T extends DatabaseItem>(
  itemListNavigation: ItemListNavigation<T>
) => {
  const { update } = useDatabaseActions()
  const { add, replace } = useQueueActions()

  useFocusScopeGroupedKeybindings({
    ADD: () => {
      if (R.isNil(itemListNavigation.currentItem)) {
        return
      }

      add([itemListNavigation.currentItem])
    },
    PLAY: () => {
      if (R.isNil(itemListNavigation.currentItem)) {
        return
      }

      replace([itemListNavigation.currentItem])
    },
    DATABASE_UPDATE_AT_POINT: () => {
      if (R.isNil(itemListNavigation.currentItem)) {
        return
      }

      update(itemListNavigation.currentItem.uri)
    },
  })
}

export default useDatabaseItemListKeybindings
