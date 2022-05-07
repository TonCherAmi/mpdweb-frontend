import React from 'react'

import cx from 'classnames'

import * as R from 'ramda'

import PlaylistDuration from '@app/playlist/components/PlaylistDuration'
import PlaylistPosition from '@app/playlist/components/PlaylistPosition'

import useStatusContext from '@app/status/use/useStatusContext'

import styles from './styles.scss'

interface Props {
  className?: string
}

const PlaylistInfo = ({ className }: Props) => {
  const status = useStatusContext()

  if (R.isNil(status)) {
    return null
  }

  const currentPosition = R.isNil(status.song) ? 0 : status.song.position + 1

  return (
    <div className={cx(styles.container, className)}>
      <PlaylistPosition
        currentPosition={currentPosition}
        totalLength={status.playlist.length}
      />
      <PlaylistDuration playlist={status.playlist} />
    </div>
  )
}

export default PlaylistInfo
