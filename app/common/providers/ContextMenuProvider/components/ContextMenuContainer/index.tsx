import React, { useRef, useMemo } from 'react'

import * as R from 'ramda'

import Thunk from '@app/common/types/Thunk'

import { ContextMenu } from '@app/common/contexts/ContextMenuContext'

import useOnOutsideEvent from '@app/common/use/useOnOutsideEvent'
import useKeybindings, { KeybindingHandlers } from '@app/keybindings/use/useKeybindings'
import useContextMenuContainerStyle from '@app/common/providers/ContextMenuProvider/use/useContextMenuContainerStyle'

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
      scroll: onClose
    }
  }, [onClose])

  useOnOutsideEvent(containerRef, mappings)

  const containerStyle = useContextMenuContainerStyle({ containerRef, contextMenu })

  const keybindingHandlers: KeybindingHandlers = useMemo(() => ({
    CONTEXT_MENU_CLOSE: onClose
  }), [onClose])

  useKeybindings(keybindingHandlers, {
    disable: R.isNil(contextMenu)
  })

  return (
    <React.Fragment>
      <div
        ref={containerRef}
        style={containerStyle}
        className={styles.container}
      >
        {contextMenu?.component}
      </div>
    </React.Fragment>
  )
}

export default ContextMenuContainer
