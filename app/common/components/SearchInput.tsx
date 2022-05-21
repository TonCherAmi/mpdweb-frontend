import React, { ChangeEventHandler } from 'react'

import * as R from 'ramda'

import Thunk from '@app/common/types/Thunk'

interface Props {
  className?: string
  autofocus?: boolean
  value: string
  onExit?: Thunk
  onCancel?: Thunk
  onAccept?: Thunk
  onBlur?: Thunk
  onFocus?: Thunk
  onChange: ChangeEventHandler<HTMLInputElement>
}

const SearchInput = React.forwardRef<HTMLInputElement, Props>(({
  className,
  autofocus,
  value,
  onExit,
  onCancel,
  onAccept,
  onBlur,
  onFocus,
  onChange
}, ref) => {
  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
    if (R.isNil(onFocus)) {
      return
    }

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
    <input
      ref={ref}
      className={className}
      autoFocus={autofocus}
      spellCheck={false}
      value={value}
      onBlur={onBlur}
      onFocus={handleFocus}
      onChange={onChange}
      onKeyDown={handleKeyDown}
    />
  )
})

export default SearchInput
