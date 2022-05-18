import React from 'react'

import Button from '@app/common/components/Button'

import QueueService from '@app/queue/services/QueueService'

type Props = Omit<React.ComponentProps<typeof Button>, 'onClick'>

const QueueClearButton = ({ children, ...props }: Props) => {
  const handleClick = () => QueueService.clear()

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  )
}

export default QueueClearButton
