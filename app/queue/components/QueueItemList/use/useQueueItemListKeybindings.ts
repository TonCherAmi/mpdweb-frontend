import * as R from 'ramda'

import QueueItem from '@app/queue/data/QueueItem'

import useQueueActions from '@app/queue/use/useQueueActions'
import useDatabaseViewNavigation from '@app/database/views/DatabaseView/use/useDatabaseViewNavigation'
import useFocusScopeGroupedKeybindings from '@app/keybindings/use/useFocusScopeGroupedKeybindings'

import QueueService from '@app/queue/services/QueueService'
import PlaybackService from '@app/playback/services/PlaybackService'

import { dirname } from '@app/common/utils/path'

const useQueueItemListKeybindings = (item: Nullable<QueueItem>) => {
  const { add } = useQueueActions()
  const { goTo } = useDatabaseViewNavigation()

  const withItem = (fn: (item: QueueItem) => unknown) => {
    if (R.isNil(item)) {
      return
    }

    return () => fn(item)
  }

  useFocusScopeGroupedKeybindings({
    ADD: withItem(add),
    PLAY: withItem(PlaybackService.play),
    OPEN: withItem((item) => goTo(
      dirname(item.uri)
    )),
    REMOVE: withItem(QueueService.delete),
    NAVIGATE_RIGHT: withItem(PlaybackService.play),
  }, { disable: R.isNil(item) })
}

export default useQueueItemListKeybindings
