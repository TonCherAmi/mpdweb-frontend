import React from 'react'

import Button from '@app/common/components/Button'

import PlaylistService from '@app/playlist/services/PlaylistService'

type Props = Omit<React.ComponentProps<typeof Button>, 'onClick'>

const PlaylistClearButton = ({ children, ...props }: Props) => {
  const handleClick = () => PlaylistService.clear()

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  )
}

export default PlaylistClearButton
