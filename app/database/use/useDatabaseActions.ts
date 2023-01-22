import { useMemo } from 'react'

import useChannelActionContext from '@app/channel/use/useChannelActionContext'

interface Actions {
  update(uri?: Nullable<string>): void
}

const useDatabaseActions = (): Actions => {
  const perform = useChannelActionContext()

  return useMemo(() => ({
    update: (uri) => perform({ dbUpdate: { uri } }),
  }), [perform])
}

export default useDatabaseActions
