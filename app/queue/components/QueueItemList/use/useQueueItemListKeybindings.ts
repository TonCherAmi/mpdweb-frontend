import * as R from 'ramda'

import QueueItem from '@app/queue/data/QueueItem'

import useQueueActions from '@app/queue/use/useQueueActions'
import usePlaybackActions from '@app/playback/use/usePlaybackActions'
import useDatabaseViewNavigation from '@app/database/views/DatabaseView/use/useDatabaseViewNavigation'
import useFocusScopeGroupedKeybindings from '@app/keybindings/use/useFocusScopeGroupedKeybindings'

import { dirname } from '@app/common/utils/path'

const useQueueItemListKeybindings = (item: Nullable<QueueItem>) => {
  const { add, remove } = useQueueActions()
  const { play } = usePlaybackActions()
  const { goTo } = useDatabaseViewNavigation()

  const withItem = (fn: (item: QueueItem) => unknown) => {
    if (R.isNil(item)) {
      return
    }

    return () => fn(item)
  }

  useFocusScopeGroupedKeybindings({
    ADD: withItem((item) => add([item])),
    PLAY: withItem(play),
    GO_TO_DEFINITION: withItem((item) => goTo(dirname(item.uri))),
    REMOVE: withItem(remove),
    NAVIGATE_RIGHT: withItem(play),
  }, { disable: R.isNil(item) })
}

export default useQueueItemListKeybindings
