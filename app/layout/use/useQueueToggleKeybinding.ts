import { useEffect } from 'react'

import * as R from 'ramda'

import useKeybindings from '@app/keybindings/use/useKeybindings'
import useQueueContext from '@app/queue/use/useQueueContext'
import useStatusContext from '@app/status/use/useStatusContext'
import useFocusGroupActive from '@app/ui/use/useFocusGroupActive'
import useFocusScopeContext from '@app/ui/use/useFocusScopeContext'
import useAnyFocusScopeActive from '@app/ui/use/useAnyFocusScopeActive'

const useQueueToggleKeybinding = () => {
  const queue = useQueueContext()
  const status = useStatusContext()

  const [, dispatchFocusScope] = useFocusScopeContext()

  const isFocusGroupActive = useFocusGroupActive()

  const isApplicableFocusScopeActive = useAnyFocusScopeActive(['queue', 'view'])

  const isQueueUnfocusable = R.isEmpty(queue) || (
    queue.length === 1 && !R.isNil(status.song)
  )

  useEffect(() => {
    if (isQueueUnfocusable && isFocusGroupActive) {
      dispatchFocusScope({ type: 'toggle', scope: 'queue' })
    }
  }, [isQueueUnfocusable, isFocusGroupActive, dispatchFocusScope])

  useKeybindings({
    QUEUE_FOCUS_TOGGLE: () => dispatchFocusScope({ type: 'toggle', scope: 'queue' }),
  }, { disable: isQueueUnfocusable || !isApplicableFocusScopeActive })
}

export default useQueueToggleKeybinding
