import { useMemo } from 'react'

import useKeybindings from '@app/keybindings/use/useKeybindings'
import useModalStateContext from '@app/ui/use/useModalStateContext'

import { DATABASE_SEARCH_MODAL_ID } from '@app/database/components/DatabaseSearchModal'

const useModalKeybindings = () => {
  const [, setActiveModalId] = useModalStateContext()

  const handlers = useMemo(() => ({
    DATABASE_SEARCH_MODAL: () => setActiveModalId(DATABASE_SEARCH_MODAL_ID)
  }), [setActiveModalId])

  useKeybindings({ handlers })
}

export default useModalKeybindings
