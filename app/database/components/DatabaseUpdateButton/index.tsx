import React from 'react'

import Button from '@app/common/components/Button'

import DatabaseService from '@app/database/services/DatabaseService'

type Props = Omit<React.ComponentProps<typeof Button>, 'onClick'>

const DatabaseUpdateButton = ({ children, ...props }: Props) => {
  const handleClick = () => DatabaseService.update()

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  )
}

export default DatabaseUpdateButton
