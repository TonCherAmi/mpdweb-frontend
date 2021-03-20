import React from 'react'

import Button from '@app/common/components/Button'

import PlaylistStore from '@app/playlist/stores/PlaylistStore'

  const handleClick = () => PlaylistStore.add(uri)
interface Props {
  uri: string
}

const PlaylistAddButton: React.FC<Props> = ({ uri, children, ...props }) => {

  return (
    <Button {...props} onClick={handleClick}>
      {children as JSX.TChildren[]}
    </Button>
  )
}

export default PlaylistAddButton
