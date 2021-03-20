import React from 'react'

import Key from '@app/common/dto/enums/Key'

import * as Icons from '@app/common/icons'

import styles from './styles.scss'

interface Props {
  isFocused: boolean
  value: string
  onExit: () => void
  onChange: (value: string) => void
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

  handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case Key.ESCAPE:
        event.preventDefault()

        this.props.onExit()

        return
      case Key.TAB:
      case Key.ENTER:
        event.preventDefault()

        this.props.onCompletion()

        return
    }
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
