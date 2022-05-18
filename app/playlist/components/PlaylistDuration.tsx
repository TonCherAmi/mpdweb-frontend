import React from 'react'

import Status from '@app/status/data/Status'

import Duration from '@app/common/components/Duration'

interface Props {
  className?: string
  playlist: Status['playlist']
}

const PlaylistDuration = ({ className, playlist }: Props) => {
  return (
    <span className={className}>
      <Duration value={playlist?.elapsed} />
      {' '}
      /
      {' '}
      <Duration value={playlist?.duration} />
    </span>
  )
}

export default PlaylistDuration
