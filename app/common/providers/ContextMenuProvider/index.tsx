import ReactDOM from 'react-dom'
import React, { useRef, useState, useMemo, useReducer, useEffect } from 'react'

import * as R from 'ramda'

import ContextMenuContext, { ContextMenu } from '@app/common/contexts/ContextMenuContext'

import useOnOutsideEvent from '@app/common/use/useOnOutsideEvent'

import useContextMenuContainerStyle from './use/useContextMenuContainerStyle'

import styles from './styles.scss'

const contextMenuContainerElement = document.getElementById('contextmenu')

if (R.isNil(contextMenuContainerElement)) {
  throw Error('contextmenu container not found')
}

interface Props {
  children: React.ReactNode
}

const ContextMenuProvider = ({ children }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const [contextMenu, setContextMenu] = useState<Nullable<ContextMenu>>(null)

  const mappings = useMemo(() => {
    const handleOutsideClick = (event: Event) => {
      event.preventDefault()
      event.stopPropagation()

      setContextMenu(null)
    }

    const handleOutsideScroll = () => {
      setContextMenu(null)
    }

    return {
      click: handleOutsideClick,
      scroll: handleOutsideScroll
    }
  }, [])

  useOnOutsideEvent(containerRef, mappings)

  const [key, incrementKey] = useReducer(R.inc, 0)

  useEffect(() => {
    // force remount
    incrementKey()
  }, [contextMenu])

  const containerStyle = useContextMenuContainerStyle({ containerRef, contextMenu })

  const renderContextMenu = () => {
    if (R.isNil(contextMenu)) {
      return null
    }

    return ReactDOM.createPortal((
      <div
        ref={containerRef}
        key={key}
        style={containerStyle}
        className={styles.container}
      >
        {contextMenu?.component}
      </div>
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
