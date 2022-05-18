import React from 'react'

interface Props {
  className?: string
  currentPosition: number
  totalLength: number
}

const QueuePosition = ({ className, currentPosition, totalLength }: Props) => {
  return (
    <span className={className}>
      track
      {' '}
      {currentPosition}
      /
      {totalLength}
    </span>
  )
}

export default QueuePosition
