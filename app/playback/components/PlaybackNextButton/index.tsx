import React from 'react'

import Button from '@app/common/components/Button'

import useQueueActions from '@app/queue/use/useQueueActions'

type Props = Omit<React.ComponentProps<typeof Button>, 'onClick'>

const PlaybackNextButton = ({ children, ...props }: Props) => {
  const { next } = useQueueActions()

  return (
    <Button {...props} onClick={next}>
      {children}
    </Button>
  )
}

export default PlaybackNextButton
