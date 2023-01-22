import React from 'react'

import Button from '@app/common/components/Button'

import useQueueActions from '@app/queue/use/useQueueActions'

type Props = Omit<React.ComponentProps<typeof Button>, 'onClick'>

const PlaybackPrevButton = ({ children, ...props }: Props) => {
  const { prev } = useQueueActions()

  return (
    <Button {...props} onClick={prev}>
      {children}
    </Button>
  )
}

export default PlaybackPrevButton
