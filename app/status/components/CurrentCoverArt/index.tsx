import React from 'react'

import * as R from 'ramda'

import DatabaseCoverArt from '@app/database/components/DatabaseCoverArt'

import useCurrentSong from '@app/status/use/useCurrentSong'

const CurrentCoverArt = ({ className }: { className?: string }) => {
  const currentSong = useCurrentSong()

  if (R.isNil(currentSong)) {
    return null
  }

  return (
    <DatabaseCoverArt className={className} file={currentSong} />
  )
}

export default CurrentCoverArt
