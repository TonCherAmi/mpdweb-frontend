import { ContextType, useContext } from 'react'

import VolumeContext from '@app/volume/contexts/VolumeContext'

const useVolumeContext = (): ContextType<typeof VolumeContext> => {
  return useContext(VolumeContext)
}

export default useVolumeContext
