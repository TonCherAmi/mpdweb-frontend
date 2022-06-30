import { useEffect } from 'react'

import * as R from 'ramda'

import useKeybindings from '@app/keybindings/use/useKeybindings'
import useQueueContext from '@app/queue/use/useQueueContext'
import useFocusScopeContext from '@app/ui/use/useFocusScopeContext'
import useAnyFocusScopeActive from '@app/ui/use/useAnyFocusScopeActive'

const useQueueToggleKeybinding = () => {
  const queue = useQueueContext()

  const [focusScope, dispatchFocusScope] = useFocusScopeContext()

  const isApplicableFocusScopeActive = useAnyFocusScopeActive(['queue', 'view'])

  useEffect(() => {
    if (queue.length <= 1 && focusScope === 'queue') {
      dispatchFocusScope({ type: 'toggle', scope: 'queue' })
    }
  }, [queue.length, focusScope, dispatchFocusScope])

  useKeybindings({
    QUEUE_TOGGLE: () => dispatchFocusScope({ type: 'toggle', scope: 'queue' }),
  }, { disable: R.isEmpty(queue) || !isApplicableFocusScopeActive })
}

export default useQueueToggleKeybinding
