import React, { useRef, useState, useLayoutEffect } from 'react'

import * as R from 'ramda'

import Thunk from '@app/common/types/Thunk'
import TimeoutId from '@app/common/types/TimeoutId'

import ContextMenuItemData from './types/ContextMenuItem'

import ContextMenuItem from './components/ContextMenuItem'

import useContextMenuStyle from './use/useContextMenuStyle'

import styles from './styles.scss'

interface WrapperProps {
  items: ReadonlyArray<ContextMenuItemData>
  onClose: Thunk
}

interface Props extends WrapperProps {
  parentRect?: DOMRect
  sourceItemRect?: DOMRect
}

const SUBMENU_MOUSE_ENTER_APPEARANCE_DELAY_MS = 325

const ContextMenuWrapper = (props: WrapperProps) => (
  <ContextMenu {...props} />
)

const makeClickHandlerWrapper = (onClose: Props['onClose']) => {
  return (item: ContextMenuItemData) => {
    if (!R.has('handler', item)) {
      return item
    }

    const handler = () => {
      onClose()

      item.handler()
    }

    return { ...item, handler }
  }
}

const ContextMenu = ({ items, parentRect, sourceItemRect, onClose }: Props) => {
  const [submenuSource, setSubmenuSource] = useState<Nullable<{
    id: string
    rect: DOMRect
    items: ReadonlyArray<ContextMenuItemData>
  }>>(null)

  const timeoutIdRef = useRef<Nullable<TimeoutId>>(null)

  const containerRef = useRef<HTMLDivElement>(null)

  const style = useContextMenuStyle({
    containerRef,
    parentRect,
    sourceItemRect,
  })

  useLayoutEffect(() => {
    if (R.isEmpty(items)) {
      onClose()
    }
  }, [items, onClose])

  const handleMouseEnter = (source: typeof submenuSource) => {
    if (!R.isNil(timeoutIdRef.current)) {
      clearTimeout(timeoutIdRef.current)

      timeoutIdRef.current = null
    }

    if (submenuSource?.id === source?.id) {
      return
    }

    setSubmenuSource(null)

    if (!R.isNil(source)) {
      timeoutIdRef.current = setTimeout(() => {
        setSubmenuSource(source)
      }, SUBMENU_MOUSE_ENTER_APPEARANCE_DELAY_MS)
    }
  }

  const renderSubmenu = () => {
    if (R.isNil(submenuSource)) {
      return null
    }

    return (
      <ContextMenu
        items={submenuSource.items}
        parentRect={containerRef.current?.getBoundingClientRect()}
        sourceItemRect={submenuSource.rect}
        onClose={onClose}
      />
    )
  }

  const wrapClickHandler = makeClickHandlerWrapper(onClose)

  return (
    <div ref={containerRef} style={style} className={styles.container}>
      <For of={items} body={(item) => (
        <ContextMenuItem
          key={item.id}
          item={wrapClickHandler(item)}
          onMouseEnter={handleMouseEnter} />
      )} />
      {renderSubmenu()}
    </div>
  )
}

export default ContextMenuWrapper
