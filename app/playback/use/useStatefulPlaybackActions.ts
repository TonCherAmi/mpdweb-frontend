import { useMemo } from 'react'

import Thunk from '@app/common/types/Thunk'

import useStatusContext from '@app/status/use/useStatusContext'
import usePlaybackActions from '@app/playback/use/usePlaybackActions'

interface Actions {
  toggle: Thunk
}

const useStatefulPlaybackActions = (): Actions => {
  const status = useStatusContext()

  const { play, toggle } = usePlaybackActions()

  return useMemo(() => ({
    toggle: status.state === 'stopped' ? play : toggle,
  }), [status.state, play, toggle])
}

export default useStatefulPlaybackActions
