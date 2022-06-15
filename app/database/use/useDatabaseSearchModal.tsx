import React from 'react'

import DatabaseSearchModal from '@app/database/components/DatabaseSearchModal'

import useModal from '@app/ui/use/useModal'

const useDatabaseSearchModal = () => {
  return useModal((onClose) => (
    <DatabaseSearchModal onClose={onClose} />
  ))
}

export default useDatabaseSearchModal
