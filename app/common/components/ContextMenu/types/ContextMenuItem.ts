import Thunk from '@app/common/types/Thunk'

type ContextMenuItem = { id: string, text: string }
  & ({ handler: Thunk } | { items: ReadonlyArray<ContextMenuItem> })

export default ContextMenuItem
