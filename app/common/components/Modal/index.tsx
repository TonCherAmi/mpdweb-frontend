import ReactDOM from 'react-dom'
import React, { useEffect, useRef } from 'react'

import cx from 'classnames'

import * as R from 'ramda'

import Thunk from '@app/common/types/Thunk'

import useOnOutsideEvent from '@app/common/use/useOnOutsideEvent'
import useFocusScopeContext from '@app/ui/use/useFocusScopeContext'
import useFocusScopeGroupedKeybindings from '@app/keybindings/use/useFocusScopeGroupedKeybindings'

import styles from './styles.scss'

interface Props {
  className?: string
  isOpen: boolean
  onClose: Thunk
  children: React.ReactNode
}

const modalContainerElement = document.getElementById('modal')

if (R.isNil(modalContainerElement)) {
  throw Error('modal container not found')
}

// TODO: implement focus trapping
const Modal = ({ className, isOpen, onClose, children }: Props) => {
  useFocusScopeGroupedKeybindings({
    MODAL_CLOSE: onClose
  }, { disable: !isOpen })

  const [, dispatchFocusScope] = useFocusScopeContext()

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      dispatchFocusScope({ type: 'toggle', scope: 'modal' })

      return () => {
        dispatchFocusScope({ type: 'toggle', scope: 'modal' })
      }
    }
  }, [isOpen, dispatchFocusScope])

  useOnOutsideEvent(containerRef, {
    click: onClose
  })

  if (!isOpen) {
    return null
  }

  return ReactDOM.createPortal((
    <React.Fragment>
      <div className={styles.overlay} />
      <div ref={containerRef} className={cx(styles.container, className)}>
        {children}
      </div>
    </React.Fragment>
  ), modalContainerElement)
}

export default Modal
