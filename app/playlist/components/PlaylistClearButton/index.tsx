import React from 'react'

import Button from '@app/common/components/Button'

import PlaylistService from '@app/playlist/services/PlaylistService'

const PlaylistClearButton: React.FC<UnknownRecord> = ({ children, ...props }) => {
  const handleClick = () => PlaylistService.clear()

  return (
    <Button {...props} onClick={handleClick}>
      {children as JSX.TChildren[]}
    </Button>
  )
}

export default PlaylistClearButton
