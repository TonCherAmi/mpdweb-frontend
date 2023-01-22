import React from 'react'

import Button from '@app/common/components/Button'

import useQueueActions from '@app/queue/use/useQueueActions'

type Props = Omit<React.ComponentProps<typeof Button>, 'onClick'>

const QueueClearButton = ({ children, ...props }: Props) => {
  const { clear } = useQueueActions()

  return (
    <Button {...props} onClick={clear}>
      {children}
    </Button>
  )
}

export default QueueClearButton
