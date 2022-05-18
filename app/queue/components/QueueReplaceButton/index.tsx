import React from 'react'

import Button from '@app/common/components/Button'

import QueueService from '@app/queue/services/QueueService'

interface Props extends React.ComponentProps<typeof Button> {
  uri: string
}

const QueueReplaceButton = ({ uri, children, ...props }: Props) => {
  const handleClick = async () => {
    await QueueService.replace(uri)
  }

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  )
}

export default QueueReplaceButton
