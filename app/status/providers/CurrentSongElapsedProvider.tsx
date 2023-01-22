import React, { useState, useEffect } from 'react'

import * as R from 'ramda'

import CurrentSongElapsedContext from '@app/status/contexts/CurrentSongElapsedContext'

import useStatusContext from '@app/status/use/useStatusContext'

const CurrentSongElapsedProvider = ({ children }: { children: React.ReactNode }) => {
  const status = useStatusContext()

  const [currentSongElapsed, setCurrentSongElapsed] = useState(
    Math.ceil(status.song?.elapsed?.total?.seconds ?? 0)
  )

  useEffect(() => {
    setCurrentSongElapsed(
      Math.ceil(status.song?.elapsed?.total?.seconds ?? 0)
    )

    if (status.state !== 'playing') {
      return
    }

    const intervalId = setInterval(() => {
      setCurrentSongElapsed(R.inc)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [status.state, status.song?.id, status.song?.elapsed?.total?.seconds])

  return (
    <CurrentSongElapsedContext.Provider value={currentSongElapsed}>
      {children}
    </CurrentSongElapsedContext.Provider>
  )
}

export default CurrentSongElapsedProvider
