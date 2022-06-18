import React, { useRef } from 'react'

import * as R from 'ramda'

import DatabaseFile from '@app/database/data/DatabaseFile'

import DatabaseCoverArt from '@app/database/components/DatabaseCoverArt'

import useCurrentSong from '@app/status/use/useCurrentSong'
import useKeybindings from '@app/keybindings/use/useKeybindings'
import useCanOpenModal from '@app/ui/use/useCanOpenModal'
import useDatabaseCoverArtModal from '@app/database/use/useDatabaseCoverArtModal'

interface Props {
  className?: string
  fallbackIconClassName?: string
  currentSong: DatabaseFile
}

const CurrentCoverArt = ({ className, fallbackIconClassName, currentSong }: Props) => {
  const { open: openModal } = useDatabaseCoverArtModal(currentSong)

  const isLoadedSuccessfullyRef = useRef(false)

  const canOpenModal = useCanOpenModal()

  useKeybindings({
    DATABASE_CURRENT_COVER_ART_MODAL: openModal,
  }, { disable: !canOpenModal || !isLoadedSuccessfullyRef.current })

  const handleSuccess = () => {
    isLoadedSuccessfullyRef.current = true
  }

  return (
    <DatabaseCoverArt
      className={className}
      fallbackIconClassName={fallbackIconClassName}
      file={currentSong}
      onClick={openModal}
      onSuccess={handleSuccess}
    />
  )
}

const CurrentCoverArtWrapper = (props: Omit<Props, 'currentSong'>) => {
  const currentSong = useCurrentSong()

  if (R.isNil(currentSong)) {
    return null
  }

  return (
    <CurrentCoverArt currentSong={currentSong} {...props} />
  )
}

export default CurrentCoverArtWrapper
