import React, { useRef } from 'react'

import cx from 'classnames'

import * as R from 'ramda'

import Handler from '@app/common/types/Handler'

import ContextMenuItemData from '@app/common/components/ContextMenu/types/ContextMenuItem'

import * as Icons from '@app/common/icons'

import styles from './styles.scss'

interface Props {
  item: ContextMenuItemData
  onMouseEnter: Handler<
    Nullable<{
      id: ContextMenuItemData['id']
      rect: DOMRect
      items: ReadonlyArray<ContextMenuItemData>
    }>
  >
}

const ContextMenuItem = ({ item, onMouseEnter }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const hasItems = R.has('items', item)
  const hasHandler = R.has('handler', item)

  const handleClick = () => {
    if (hasHandler) {
      item.handler()
    }
  }

  const handleMouseEnter = () => {
    if (!hasItems) {
      onMouseEnter(null)

      return
    }

    if (R.isNil(containerRef.current)) {
      return
    }

    onMouseEnter({
      id: item.id,
      items: item.items,
      rect: containerRef.current.getBoundingClientRect(),
    })
  }

  return (
    <div
      ref={containerRef}
      className={cx(styles.container)}
      onClick={handleClick}
      onMouseUp={handleClick}
      onMouseEnter={handleMouseEnter}
    >
      <span className={styles.text}>
        {item.text}
      </span>
      <If condition={hasItems}>
        <Icons.AngleRight className={styles.icon} />
      </If>
    </div>
  )
}

export default ContextMenuItem
