import React, { memo } from 'react'

import ReactModal from 'react-modal'

import cx from 'classnames'

import Thunk from '@app/common/types/Thunk'



import useFocusScopeContext from '@app/ui/use/useFocusScopeContext'
import useFocusScopeGroupedKeybindings from '@app/keybindings/use/useFocusScopeGroupedKeybindings'

import styles from './styles.scss'

interface Props {
  className?: string
  isOpen: boolean
  onClose: Thunk
  children: React.ReactNode
}

const Modal = ({ className, isOpen, onClose, children }: Props) => {
  useFocusScopeGroupedKeybindings({
    MODAL_CLOSE: onClose
  }, { disable: !isOpen })

  return (
    <React.Fragment>
      <ReactModal
        className={cx(styles.container, className)}
        overlayClassName={styles.overlay}
        isOpen={isOpen}
        onRequestClose={onClose}
      >
        {children}
      </ReactModal>
    </React.Fragment>
  )
}

export default Modal
