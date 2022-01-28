import React from 'react'

import Button from '@app/common/components/Button'

import PlaylistService from '@app/playlist/services/PlaylistService'

type Props = React.ComponentProps<typeof Button>

const PlaylistClearButton = ({ children, ...props }: Props) => {
  const handleClick = () => PlaylistService.clear()

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  )
}

export default PlaylistClearButton
