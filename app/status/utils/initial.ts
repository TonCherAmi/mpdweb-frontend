import Status from '@app/status/dto/Status'

import { DURATION_ZERO } from '@app/common/utils/duration'

export const INITIAL_STATUS: Status = {
  state: 'STOPPED',
  volume: 0,
  song: null,
  playlist: {
    length: 0,
    elapsed: DURATION_ZERO,
    duration: DURATION_ZERO
  },
  single: 'OFF',
  random: false,
  repeat: false,
  consume: false
}
