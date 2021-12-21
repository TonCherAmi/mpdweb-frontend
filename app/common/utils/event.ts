import React from 'react'

export const withPropagationStopped = <T extends React.SyntheticEvent> (
  fn: Nullable<React.EventHandler<T>>
) => (event): unknown => {
  event.stopPropagation()

  return fn?.(event)
}
