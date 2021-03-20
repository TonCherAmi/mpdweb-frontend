import React from 'react'

import Button from '@app/common/components/Button'

import PlaylistStore from '@app/playlist/stores/PlaylistStore'

  const handleClick = () => PlaylistStore.clear()
const PlaylistClearButton: React.FC<UnknownRecord> = ({ children, ...props }) => {

  return (
    <Button {...props} onClick={handleClick}>
      {children as JSX.TChildren[]}
    </Button>
  )
}

export default PlaylistClearButton
