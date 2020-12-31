import React from 'react'

export const withPropagationStopped = <T> (
  fn: (event: React.SyntheticEvent) => T
) => (event: React.SyntheticEvent): T => {
  event.stopPropagation()

  return fn(event)
}
