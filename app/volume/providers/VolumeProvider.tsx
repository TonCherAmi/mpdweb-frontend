import React, { useState, useMemo, useEffect } from 'react'

import * as R from 'ramda'

import VolumeContext from '@app/volume/contexts/VolumeContext'

import useDebounce from '@app/common/use/useDebounce'
import useStatusContext from '@app/status/use/useStatusContext'
import useVolumeActions from '@app/volume/use/useVolumeActions'

const VOLUME_SET_DEBOUNCE_MS = 200

const VOLUME_STEP = 5

const clampVolume = R.clamp(0, 100)

const VolumeProvider = ({ children }: { children: React.ReactNode }) => {
  const status = useStatusContext()

  const [volume, setVolume] = useState(status.volume)

  const { set } = useVolumeActions()

  const [setDebounced] = useDebounce(set, VOLUME_SET_DEBOUNCE_MS)

  useEffect(() => {
    setVolume(status.volume)
  }, [status.volume])

  const value = useMemo(() => {
    const change = (n: number) => {
      if (n === volume) {
        return
      }

      setVolume(n)

      setDebounced(n)
    }

    return ({
      set: change,
      inc: () => change(clampVolume(volume + VOLUME_STEP)),
      dec: () => change(clampVolume(volume - VOLUME_STEP)),
      value: volume,
    })
  }, [volume, setDebounced])

  return (
    <VolumeContext.Provider value={value}>
      {children}
    </VolumeContext.Provider>
  )
}

export default VolumeProvider
