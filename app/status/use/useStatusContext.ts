import Status from '@app/status/data/Status'

import useRawStatusContext from '@app/status/use/useRawStatusContext'

const DEFAULT_STATUS: Status = {
  state: 'stopped',
  volume: 50,
  song: null,
  repeat: false,
  random: false,
  single: 'off',
  consume: 'off',
  queue: {
    length: 0,
  },
}

const useStatusContext = (): Status => {
  const status =  useRawStatusContext()

  if (status?.status !== 'ok') {
    return DEFAULT_STATUS
  }

  return status.data
}

export default useStatusContext
