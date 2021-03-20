import React from 'react'

import Button from '@app/common/components/Button'

import DatabaseStore from '@app/database/stores/DatabaseStore'

  const handleClick = () => DatabaseStore.update()
const DatabaseUpdateButton: React.FC<UnknownRecord> = ({ children, ...props }) => {

  return (
    <Button {...props} onClick={handleClick}>
      {children as JSX.TChildren[]}
    </Button>
  )
}

export default DatabaseUpdateButton
