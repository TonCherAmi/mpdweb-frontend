import React from 'react'

import Button from '@app/common/components/Button'

import useDatabaseActions from '@app/database/use/useDatabaseActions'

type Props = Omit<React.ComponentProps<typeof Button>, 'onClick'>

const DatabaseUpdateButton = ({ children, ...props }: Props) => {
  const { update } = useDatabaseActions()

  const handleClick = () => {
    update()
  }

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  )
}

export default DatabaseUpdateButton
