import React from 'react'

import Duration from '@app/common/components/Duration'

import useStatusContext from '@app/status/use/useStatusContext'

const CurrentSongElapsed = ({ className }: { className?: string }) => {
  const status = useStatusContext()

  return (
    <Duration className={className} value={status.song?.elapsed} />
  )
}

export default CurrentSongElapsed
