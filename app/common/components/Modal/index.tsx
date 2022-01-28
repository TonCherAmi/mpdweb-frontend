import React, { memo } from 'react'

import ReactModal from 'react-modal'

import cx from 'classnames'

import Thunk from '@app/common/types/Thunk'

import useKeybindings from '@app/keybindings/use/useKeybindings'

import KeybindingScope from '@app/keybindings/components/KeybindingScope'

import KeybindingScopeContext from '@app/keybindings/contexts/KeybindingScopeContext'

import styles from './styles.scss'

interface Props {
  className?: string
  isOpen: boolean
  onClose: Thunk
  children: React.ReactNode
}

const Modal = ({ className, isOpen, onClose, children }: Props) => {
  useKeybindings({
    disable: !isOpen,
    handlers: {
      MODAL_CLOSE: onClose
    }
  })

  return (
    <React.Fragment>
      <If condition={isOpen}>
        <KeybindingScope scope="modal" />
      </If>
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

const ScopedModal = memo(({ children, ...rest }: Props) => (
  <KeybindingScopeContext.Provider value="modal">
    <Modal {...rest}>
      {children}
    </Modal>
  </KeybindingScopeContext.Provider>
))

export default ScopedModal
