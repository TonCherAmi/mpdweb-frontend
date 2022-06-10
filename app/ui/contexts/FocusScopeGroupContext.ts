import { createContext } from 'react'

import { FocusScope } from '@app/ui/contexts/FocusScopeContext'

const FocusScopeGroupContext = createContext<Nullable<FocusScope>>(null)

export default FocusScopeGroupContext
