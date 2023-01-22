import React from 'react'

import DatabaseCoverArtModal from '@app/database/components/DatabaseCoverArtModal'

import useModal from '@app/ui/use/useModal'

const useDatabaseCoverArtModal = (uri: string) => {
  return useModal((onClose) => (
    <DatabaseCoverArtModal uri={uri} onClose={onClose} />
  ))
}

export default useDatabaseCoverArtModal
