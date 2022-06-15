import React from 'react'

import Handler from '@app/common/types/Handler'

const noop = () => {
  throw Error('ModalContext provider required')
}

export interface Modal {
  component: React.ReactNode
}

const ModalContext = React.createContext<Handler<Nullable<Modal>>>(noop)

export default ModalContext
