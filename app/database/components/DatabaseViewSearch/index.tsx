import React from 'react'

import * as R from 'ramda'

import Key from '@app/common/dto/enums/Key'

import * as Icons from '@app/common/icons'

import styles from './styles.scss'

interface Props {
  isFocused: boolean
  value: string
  onExit: () => void
  onChange: (value: string) => void
  onDescent: () => void
  onCompletion: () => void
}

class DatabaseViewSearch extends React.Component<Props> {
  private inputRef: React.RefObject<HTMLInputElement>

  constructor(props: Props) {
    super(props)

    this.inputRef = React.createRef<HTMLInputElement>()
  }

  componentDidMount() {
    this.inputRef.current?.focus()
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.isFocused) {
      return
    }

    if (this.props.isFocused) {
      this.inputRef.current?.focus()
    }
  }

  get handlers(): Record<Key, () => void> {
    return {
      [Key.ESCAPE]: this.props.onExit,
      [Key.ENTER]: this.props.onDescent,
      [Key.TAB]: this.props.onCompletion
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
      <div className={styles.container}>
        <Icons.Search className={styles.icon} />
        <input
          ref={this.inputRef}
          className={styles.input}
          value={this.props.value}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default DatabaseViewSearch
