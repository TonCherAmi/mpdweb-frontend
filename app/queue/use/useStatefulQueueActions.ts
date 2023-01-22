import { useCallback, useMemo } from 'react'

import Thunk from '@app/common/types/Thunk'

import useQueueActions from '@app/queue/use/useQueueActions'
import useStatusContext from '@app/status/use/useStatusContext'

interface Actions {
  toggleRepeat: Thunk
  cycleConsume: Thunk
  toggleRandom: Thunk
  cycleSingle: Thunk
}

const oneshotStateTransitions = {
  on: 'off',
  off: 'oneshot',
  oneshot: 'on',
} as const

const useStatefulQueueActions = (): Actions => {
  const status = useStatusContext()

  const { repeat, consume, random, single } = useQueueActions()

  const toggleRepeat = useCallback(() => {
    repeat(!status.repeat)
  }, [status.repeat, repeat])

  const cycleConsume = useCallback(() => {
    consume(oneshotStateTransitions[status.consume])
  }, [status.consume, consume])

  const toggleRandom = useCallback(() => {
    random(!status.random)
  }, [status.random, random])

  const cycleSingle = useCallback(() => {
    single(oneshotStateTransitions[status.single])
  }, [status.single, single])

  return useMemo(() => ({
    toggleRepeat,
    cycleConsume,
    toggleRandom,
    cycleSingle,
  }), [toggleRepeat, cycleConsume, toggleRandom, cycleSingle])
}

export default useStatefulQueueActions
