import React, { ChangeEventHandler } from 'react'

import * as R from 'ramda'

import Thunk from '@app/common/types/Thunk'

import * as Icons from '@app/common/icons'

import styles from './styles.scss'

interface Props {
  autofocus: boolean
  value: string
  onExit: Thunk
  onCancel: Thunk
  onAccept: Thunk
  onBlur: Thunk
  onFocus: Thunk
  onChange: ChangeEventHandler<HTMLInputElement>
}

const SearchInput = React.forwardRef<HTMLInputElement, Props>(({
  autofocus,
  value,
  onExit,
  onCancel,
  onAccept,
  onBlur,
  onFocus,
  onChange
}: Props, ref) => {
  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
    event.target.select()

    onFocus()
  }

  const handleKeyDown: React.KeyboardEventHandler = (event) => {
    const handler = {
      'Tab': onExit,
      'ArrowDown': onExit,
      'Enter': onAccept,
      'Escape': onCancel
    }[event.key]

    if (R.isNil(handler)) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    handler()
  }

  return (
    <div className={styles.container}>
      <Icons.Search className={styles.icon} />
      <input
        ref={ref}
        className={styles.input}
        autoFocus={autofocus}
        value={value}
        onBlur={onBlur}
        onFocus={handleFocus}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
})

export default SearchInput
