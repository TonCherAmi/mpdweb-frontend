import * as R from 'ramda'

import DurationData from '@app/common/data/Duration'

import { addDuration, DURATION_ZERO } from '@app/common/utils/duration'

export const getTotalDuration = R.reduce<{ duration: DurationData }, DurationData>(
  (acc, { duration }) => addDuration(acc, duration),
  DURATION_ZERO
)
