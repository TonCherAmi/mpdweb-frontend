import ReactDOM from 'react-dom'
import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react'

import * as R from 'ramda'

import FocusScopeGroupContext from '@app/ui/contexts/FocusScopeGroupContext'
import ContextMenuContext, { ContextMenu } from '@app/ui/contexts/ContextMenuContext'

import useFocusScopeContext from '@app/ui/use/useFocusScopeContext'
import useKeybindings, { KeybindingHandlers } from '@app/keybindings/use/useKeybindings'

import ContextMenuContainer from './components/ContextMenuContainer'

const contextMenuContainerElement = document.getElementById('contextmenu')

if (R.isNil(contextMenuContainerElement)) {
  throw Error('contextmenu container not found')
}

interface Props {
  children: React.ReactNode
}

const ContextMenuProvider = ({ children }: Props) => {
  const [contextMenu, setContextMenu] = useState<Nullable<ContextMenu>>(null)

  const [key, incrementKey] = useReducer(R.inc, 0)

  useEffect(() => {
    // force remount
    incrementKey()
  }, [contextMenu])

  const [, dispatchFocusScope] = useFocusScopeContext()

  useEffect(() => {
    if (R.isNil(contextMenu)) {
      return
    }

    dispatchFocusScope({ type: 'toggle', scope: 'contextmenu' })

    return () => {
      dispatchFocusScope({ type: 'toggle', scope: 'contextmenu' })
    }
  }, [contextMenu, dispatchFocusScope])

  const keybindingHandlers: KeybindingHandlers = useMemo(() => ({
    CONTEXT_MENU_CLOSE: () => setContextMenu(null),
  }), [])

  useKeybindings(keybindingHandlers, {
    disable: R.isNil(contextMenu),
  })

  const handleClose = useCallback(() => {
    setContextMenu(null)
  }, [])

  const renderContextMenu = () => {
    if (R.isNil(contextMenu)) {
      return null
    }

    return ReactDOM.createPortal((
      <FocusScopeGroupContext.Provider value="contextmenu">
        <ContextMenuContainer
          key={key}
          contextMenu={contextMenu}
          onClose={handleClose}
        />
      </FocusScopeGroupContext.Provider>
    ), contextMenuContainerElement)
  }

  return (
    <ContextMenuContext.Provider value={setContextMenu}>
      {children}
      {renderContextMenu()}
    </ContextMenuContext.Provider>
  )
}

export default ContextMenuProvider
