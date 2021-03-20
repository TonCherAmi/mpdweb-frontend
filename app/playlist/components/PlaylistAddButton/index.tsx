import React from 'react'

import Button from '@app/common/components/Button'

import PlaylistService from '@app/playlist/services/PlaylistService'

interface Props {
  uri: string
}

const PlaylistAddButton: React.FC<Props> = ({ uri, children, ...props }) => {
  const handleClick = () => PlaylistService.add(uri)

  return (
    <Button {...props} onClick={handleClick}>
      {children as JSX.TChildren[]}
    </Button>
  )
}

export default PlaylistAddButton
