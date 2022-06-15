import React, { useRef } from 'react'

import cx from 'classnames'

import Thunk from '@app/common/types/Thunk'

import useOnOutsideEvent from '@app/common/use/useOnOutsideEvent'
import useFocusScopeGroupedKeybindings from '@app/keybindings/use/useFocusScopeGroupedKeybindings'

import styles from './styles.scss'

interface Props {
  className?: string
  onClose: Thunk
  children: React.ReactNode
}

// TODO: implement focus trapping
const Modal = ({ className, onClose, children }: Props) => {
  useFocusScopeGroupedKeybindings({
    MODAL_CLOSE: onClose,
  })

  const containerRef = useRef<HTMLDivElement>(null)

  useOnOutsideEvent(containerRef, {
    click: onClose,
  })

  return (
    <React.Fragment>
      <div className={styles.overlay} />
      <div ref={containerRef} className={cx(styles.container, className)}>
        {children}
      </div>
    </React.Fragment>
  )
}

export default Modal
