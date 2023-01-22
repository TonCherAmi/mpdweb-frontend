import React from 'react'

import Button from '@app/common/components/Button'

import useStatefulPlaybackActions from '@app/playback/use/useStatefulPlaybackActions'

type Props = Omit<React.ComponentProps<typeof Button>, 'onClick'>

const PlaybackToggleButton = ({ children, ...props }: Props) => {
  const { toggle } = useStatefulPlaybackActions()

  return (
    <Button {...props} onClick={toggle}>
      {children}
    </Button>
  )
}

export default PlaybackToggleButton
