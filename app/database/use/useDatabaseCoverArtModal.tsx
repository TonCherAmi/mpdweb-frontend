import React from 'react'

import DatabaseFile from '@app/database/data/DatabaseFile'

import DatabaseCoverArtModal from '@app/database/components/DatabaseCoverArtModal'

import useModal from '@app/ui/use/useModal'

const useDatabaseCoverArtModal = (file: DatabaseFile) => {
  return useModal((onClose) => (
    <DatabaseCoverArtModal file={file} onClose={onClose} />
  ))
}

export default useDatabaseCoverArtModal
