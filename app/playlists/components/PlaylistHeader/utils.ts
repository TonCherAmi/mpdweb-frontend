import * as R from 'ramda'

import Duration from '@app/common/data/Duration'

import { addDuration, DURATION_ZERO } from '@app/common/utils/duration'

export const getTotalDuration = R.reduce<{ duration: Nullable<Duration> }, Duration>(
  (acc, { duration }) => addDuration(acc, duration ?? DURATION_ZERO),
  DURATION_ZERO
)
