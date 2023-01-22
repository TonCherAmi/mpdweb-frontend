import { useMemo } from 'react'

import useChannelActionContext from '@app/channel/use/useChannelActionContext'

interface Actions {
  set: (value: number) => void
}

const useVolumeActions = (): Actions => {
  const perform = useChannelActionContext()

  return useMemo(() => ({
    set: (value) => perform({ volumeSet: { value } }),
  }), [perform])
}

export default useVolumeActions
