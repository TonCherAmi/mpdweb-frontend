import React, { memo } from 'react'

import * as R from "ramda"

import DurationPair from '@app/common/components/DurationPair'

import useStatusContext from '@app/status/use/useStatusContext'

const CurrentProgress = memo(() => {
  const status = useStatusContext()

  if (R.isNil(status)) {
    return null
  }

  return (
    <DurationPair
      first={status.elapsed}
      second={status.duration}
    />
  )
})

export default CurrentProgress
