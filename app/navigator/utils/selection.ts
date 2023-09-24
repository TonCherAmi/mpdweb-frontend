import * as R from 'ramda'

export const isSelectionActive = (): boolean => {
  const selection = getSelection()

  return !R.isNil(selection) && !R.isEmpty(selection.toString())
}
