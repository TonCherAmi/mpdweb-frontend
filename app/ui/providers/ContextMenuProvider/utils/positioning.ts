import { CSSProperties } from 'react'

export const getInsetStyle = ({
  contextMenuX,
  contextMenuY,
  documentRect,
  containerRect,
}: { documentRect: DOMRect, containerRect: DOMRect, contextMenuX: number, contextMenuY: number }): CSSProperties => {
  const style: CSSProperties = {}

  if (contextMenuY + containerRect.height > documentRect.height) {
    style.bottom = documentRect.height - contextMenuY
  } else {
    style.top = contextMenuY
  }

  if (contextMenuX + containerRect.width > documentRect.width) {
    style.right = documentRect.width - contextMenuX
  } else {
    style.left = contextMenuX
  }

  return style
}
