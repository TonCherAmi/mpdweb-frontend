import { useMemo, useState, Dispatch, SetStateAction } from 'react'

const useModalState = (): [Nullable<string>, Dispatch<SetStateAction<Nullable<string>>>] => {
  const [modalState, setModalState] = useState<Nullable<string>>(null)

  return useMemo(() => [
    modalState,
    setModalState
  ], [modalState])
}

export default useModalState
