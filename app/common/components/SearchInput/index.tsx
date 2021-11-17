import React from 'react'

import * as R from 'ramda'

import Key from '@app/common/dto/enums/Key'

export interface Props {
  isFocused: boolean
  className?: string
  value: string
  onExit: () => void
  onChange: (value: string) => void
  onDescent: () => void
  onCompletion: () => void
}

class SearchInput extends React.Component<Props> {
  private readonly inputRef: React.RefObject<HTMLInputElement>

  constructor(props: Props) {
    super(props)

    this.inputRef = React.createRef<HTMLInputElement>()
  }

  componentDidMount() {
    if (this.props.isFocused) {
      this.inputRef.current?.focus()
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.isFocused === this.props.isFocused) {
      return
    }

    if (prevProps.isFocused && !this.props.isFocused) {
      this.inputRef.current?.blur()
    }

    if (!prevProps.isFocused && this.props.isFocused) {
      this.inputRef.current?.focus()
    }
  }

  get handlers(): Record<Key, () => void> {
    return {
      [Key.ESCAPE]: this.props.onExit,
      [Key.ENTER]: this.props.onDescent,
      [Key.TAB]: this.props.onCompletion,
      [Key.ARROW_DOWN]: this.props.onCompletion
    }
  }

  handleKeyDown = (event: React.KeyboardEvent) => {
    const handler = this.handlers[event.key]

    if (R.isNil(handler)) {
      return
    }

    event.preventDefault()

    handler()
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(event.target.value)
  }

  render() {
    return (
      <input
        ref={this.inputRef}
        className={this.props.className}
        value={this.props.value}
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChange}
      />
    )
  }
}

export default SearchInput
