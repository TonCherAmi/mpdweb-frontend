import React from 'react'

import Button from '@app/common/components/Button'

import PlaylistStore from '@app/playlist/stores/PlaylistStore'

const PlaylistClearButton = ({ children, ...props }) => {
  const handleClick = () => PlaylistStore.clear()

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  )
}

export default PlaylistClearButton
