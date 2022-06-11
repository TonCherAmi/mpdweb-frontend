import * as R from 'ramda'

import ContextMenuItem from '@app/common/components/ContextMenu/types/ContextMenuItem'

import { copy } from '@app/navigator/utils/clipboard'

const getCopySelectionItem = (selection: string) => ({
  id: 'copy-selection',
  text: 'Copy Selection',
  handler: () => {
    copy(selection)
  },
})

export const wrapWithGlobalContextMenuItems = (
  items: ReadonlyArray<ContextMenuItem>
): ReadonlyArray<ContextMenuItem> => {
  const selection = getSelection()

  if (R.isNil(selection) || R.isEmpty(selection.toString())) {
    return items
  }

  const [[copyItem], rest] = R.partition(
    R.propEq('id', 'copy'),
    items
  )

  const copySelectionItem = getCopySelectionItem(selection.toString())

  if (R.isNil(copyItem)) {
    return [
      { id: 'copy', text: 'Copy', items: [copySelectionItem] },
      ...items,
    ]
  }

  if (!R.has('items', copyItem)) {
    return items
  }

  return [
    {
      ...copyItem, items: [
        copySelectionItem,
        ...copyItem.items,
      ],
    },
    ...rest,
  ]
}
