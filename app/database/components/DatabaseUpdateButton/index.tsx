import React from 'react'

import Button from '@app/common/components/Button'

import DatabaseService from '@app/database/services/DatabaseService'

type Props = React.ComponentProps<typeof Button>

const DatabaseUpdateButton = ({ children, ...props }: Props) => {
  const handleClick = () => DatabaseService.update()

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  )
}

export default DatabaseUpdateButton
