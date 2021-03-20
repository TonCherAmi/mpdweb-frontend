import React from 'react'

export const withPropagationStopped = <T> (
  fn: Nullable<(event: React.SyntheticEvent) => T>
) => (event: React.SyntheticEvent): Nullable<T> => {
  event.stopPropagation()

  return fn?.(event)
}
