import { createContext, Dispatch, SetStateAction } from 'react'

const noop = () => {
  throw Error('ModalStateContext provider required')
}

const ModalStateContext = createContext<[
  Nullable<string>,
  Dispatch<SetStateAction<Nullable<string>>>
]>([null, noop])

export default ModalStateContext
