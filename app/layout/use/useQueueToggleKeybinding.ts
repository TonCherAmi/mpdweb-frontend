import { useEffect } from 'react'

import * as R from 'ramda'

import useKeybindings from '@app/keybindings/use/useKeybindings'
import useQueueContext from '@app/queue/use/useQueueContext'
import useStatusContext from '@app/status/use/useStatusContext'
import useFocusScopeContext from '@app/ui/use/useFocusScopeContext'
import useAnyFocusScopeActive from '@app/ui/use/useAnyFocusScopeActive'

const useQueueToggleKeybinding = () => {
  const queue = useQueueContext()
  const status = useStatusContext()

  const [focusScope, dispatchFocusScope] = useFocusScopeContext()

  const isApplicableFocusScopeActive = useAnyFocusScopeActive(['queue', 'view'])

  const isQueueUnfocusable = R.isEmpty(queue) || (
    queue.length <= 1 && !R.isNil(status.song)
  )

  useEffect(() => {
    if (isQueueUnfocusable && focusScope === 'queue') {
      dispatchFocusScope({ type: 'toggle', scope: 'queue' })
    }
  }, [isQueueUnfocusable, focusScope, dispatchFocusScope])

  useKeybindings({
    QUEUE_FOCUS_TOGGLE: () => dispatchFocusScope({ type: 'toggle', scope: 'queue' }),
  }, { disable: isQueueUnfocusable || !isApplicableFocusScopeActive })
}

export default useQueueToggleKeybinding
