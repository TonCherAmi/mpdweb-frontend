import React from 'react'

import * as R from 'ramda'

import DatabaseCoverArt from '@app/database/components/DatabaseCoverArt'

import useCurrentSong from '@app/status/use/useCurrentSong'

const CurrentCoverArt = ({
  className,
  fallbackIconClassName,
}: { className?: string, fallbackIconClassName?: string }) => {
  const currentSong = useCurrentSong()

  if (R.isNil(currentSong)) {
    return null
  }

  return (
    <DatabaseCoverArt
      className={className}
      fallbackIconClassName={fallbackIconClassName}
      file={currentSong}
    />
  )
}

export default CurrentCoverArt
