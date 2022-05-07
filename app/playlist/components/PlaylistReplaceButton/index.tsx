import React from 'react'

import Button from '@app/common/components/Button'

import PlaylistService from '@app/playlist/services/PlaylistService'

interface Props extends React.ComponentProps<typeof Button> {
  uri: string
}

const PlaylistReplaceButton = ({ uri, children, ...props }: Props) => {
  const handleClick = async () => {
    await PlaylistService.replace(uri)
  }

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  )
}

export default PlaylistReplaceButton
