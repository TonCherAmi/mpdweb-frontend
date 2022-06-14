import React, { useRef, useMemo } from 'react'

import Thunk from '@app/common/types/Thunk'

import { ContextMenu } from '@app/ui/contexts/ContextMenuContext'

import useOnOutsideEvent from '@app/common/use/useOnOutsideEvent'
import useContextMenuContainerStyle from '@app/ui/providers/ContextMenuProvider/use/useContextMenuContainerStyle'

import styles from './styles.scss'

interface Props {
  contextMenu: ContextMenu
  onClose: Thunk
}

const ContextMenuContainer = ({ contextMenu, onClose }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const mappings = useMemo(() => {
    const handleOutsideClick = (event: Event) => {
      event.preventDefault()
      event.stopPropagation()

      onClose()
    }

    return {
      click: handleOutsideClick,
      scroll: onClose,
    }
  }, [onClose])

  useOnOutsideEvent(containerRef, mappings)

  const containerStyle = useContextMenuContainerStyle({ containerRef, contextMenu })

  return (
    <div
      ref={containerRef}
      style={containerStyle}
      className={styles.container}
    >
      {contextMenu.component}
    </div>
  )
}

export default ContextMenuContainer
