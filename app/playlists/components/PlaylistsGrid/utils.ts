import * as R from 'ramda'

export const calculateRowLength = (
  gridContainer: HTMLDivElement,
  items: ReadonlyArray<unknown>,
): number => {
  if (R.isEmpty(items)) {
    return 0
  }

  const gridElements = Array.from(gridContainer.children)

  const topRowElement = R.head(gridElements) as Nullable<HTMLElement>

  if (R.isNil(topRowElement)) {
    return 0
  }

  const topRowOffset = topRowElement.offsetTop

  const secondRowElementIndex = gridElements.findIndex((element) => (
    (element as HTMLElement).offsetTop > topRowOffset
  ))

  return secondRowElementIndex === -1 ? items.length : secondRowElementIndex
}
