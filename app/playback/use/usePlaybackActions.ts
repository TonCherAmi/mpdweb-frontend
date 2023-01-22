import { useMemo } from 'react'

import Thunk from '@app/common/types/Thunk'
import QueueItem from '@app/queue/data/QueueItem'

import useChannelActionContext from '@app/channel/use/useChannelActionContext'

interface PlaybackActions {
  play: (item?: Nullable<QueueItem>) => void
  stop: Thunk
  toggle: Thunk
  seek: (time: number) => void
}

const usePlaybackActions = (): PlaybackActions => {
  const perform = useChannelActionContext()

  return useMemo(() => ({
    play: (item = null) => perform({ playbackPlay: { id: item?.id } }),
    stop: () => perform('playbackStop'),
    toggle: () => perform('playbackToggle'),
    seek: (time) => perform({ playbackSeek: { time } }),
  }), [perform])
}

export default usePlaybackActions
