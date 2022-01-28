import React from 'react'

import Button from '@app/common/components/Button'

import PlaylistService from '@app/playlist/services/PlaylistService'

interface Props extends React.ComponentProps<typeof Button>{
  uri: string
}

const PlaylistAddButton = ({ uri, children, ...props }: Props) => {
  const handleClick = () => PlaylistService.add(uri)

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  )
}

export default PlaylistAddButton
