import React from 'react'

import Handler from '@app/common/types/Handler'

const noop = () => {
  throw Error('ContextMenuContext provider required')
}

export interface ContextMenu {
  x: number
  y: number
  component: React.ReactNode
}

const ContextMenuContext = React.createContext<Handler<Nullable<ContextMenu>>>(noop)

export default ContextMenuContext
