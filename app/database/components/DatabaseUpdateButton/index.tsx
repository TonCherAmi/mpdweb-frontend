import React from 'react'

import Button from '@app/common/components/Button'

import DatabaseService from '@app/database/services/DatabaseService'

const DatabaseUpdateButton: React.FC<UnknownRecord> = ({ children, ...props }) => {
  const handleClick = () => DatabaseService.update()

  return (
    <Button {...props} onClick={handleClick}>
      {children as JSX.TChildren[]}
    </Button>
  )
}

export default DatabaseUpdateButton
