import React from 'react'

import Duration from '@app/common/components/Duration'

import useStatusContext from '@app/status/use/useStatusContext'

const CurrentSongDuration = ({ className }: { className?: string }) => {
  const status = useStatusContext()

  return (
    <Duration className={className} value={status.song?.duration} />
  )
}

export default CurrentSongDuration
