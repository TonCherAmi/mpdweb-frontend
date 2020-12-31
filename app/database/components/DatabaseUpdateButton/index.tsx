import React from 'react'

import Button from '@app/common/components/Button'

import DatabaseStore from '@app/database/stores/DatabaseStore'

const DatabaseUpdateButton = ({ children, ...props }) => {
  const handleClick = () => DatabaseStore.update()

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  )
}

export default DatabaseUpdateButton
