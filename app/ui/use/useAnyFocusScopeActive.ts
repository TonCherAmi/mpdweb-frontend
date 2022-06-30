import { FocusScope } from '@app/ui/contexts/FocusScopeContext'

import useFocusScopeContext from '@app/ui/use/useFocusScopeContext'

const useAnyFocusScopeActive = (scopes: ReadonlyArray<FocusScope>): boolean => {
  const [activeFocusScope] = useFocusScopeContext()

  return scopes.includes(activeFocusScope)
}

export default useAnyFocusScopeActive
