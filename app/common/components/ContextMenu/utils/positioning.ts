import { CSSProperties } from 'react'

const SUBMENU_POSITIONING_OFFSET = 6

export const getInsetStyle = ({
  documentRect,
  parentRect,
  containerRect,
  sourceItemRect
}: { documentRect: DOMRect, parentRect: DOMRect, containerRect: DOMRect, sourceItemRect: DOMRect }): CSSProperties => {
  const style: CSSProperties = {}

  if (sourceItemRect.top + containerRect.height > documentRect.height) {
    style.bottom = parentRect.bottom - sourceItemRect.bottom - SUBMENU_POSITIONING_OFFSET
  } else {
    style.top = sourceItemRect.top - parentRect.top - SUBMENU_POSITIONING_OFFSET
  }

  if (parentRect.right + containerRect.width > documentRect.width) {
    style.right = parentRect.width + SUBMENU_POSITIONING_OFFSET
  } else {
    style.left = parentRect.width + SUBMENU_POSITIONING_OFFSET
  }

  return style
}
