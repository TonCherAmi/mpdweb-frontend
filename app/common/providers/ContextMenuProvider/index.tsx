import ReactDOM from 'react-dom'
import React, { useState, useReducer, useEffect, useCallback } from 'react'

import * as R from 'ramda'

import ContextMenuContext, { ContextMenu } from '@app/common/contexts/ContextMenuContext'

import KeybindingScope from '@app/keybindings/components/KeybindingScope'
import KeybindingScopeContext from '@app/keybindings/contexts/KeybindingScopeContext'

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

  const handleClose = useCallback(() => {
    setContextMenu(null)
  }, [])

  const renderContextMenu = () => {
    if (R.isNil(contextMenu)) {
      return null
    }

    return ReactDOM.createPortal((
        <ContextMenuContainer
          key={key}
          contextMenu={contextMenu}
          onClose={handleClose}
        />
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
