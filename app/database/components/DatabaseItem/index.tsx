import React from 'react'

import cx from 'classnames'

import DatabaseItemDto from '@app/database/dto/DatabaseItem'
import DatabaseItemType from '@app/database/dto/enums/DatabaseItemType'

import * as Icons from '@app/common/icons'

import Button from '@app/common/components/Button'
import DatabaseItemIcon from '@app/database/components/DatabaseItemIcon'

import { basename } from '@app/common/utils/path'
import { withCancellableDelay } from '@app/common/utils/delay'
import { withPropagationStopped } from '@app/common/utils/event'

import styles from './styles.scss'

interface Props {
  isFocused: boolean
  isSelected: boolean
  isMouseDisabled: boolean
  item: DatabaseItemDto
  onClick: React.EventHandler<React.MouseEvent>
  onAddClick?: React.EventHandler<React.MouseEvent>
  onPlayClick?: React.EventHandler<React.MouseEvent>
  onMouseOver?: React.EventHandler<React.MouseEvent>
}

const MOUSE_OVER_DELAY = 400 // ms

class DatabaseItem extends React.Component<Props> {
  static defaultProps = {
    isFocused: false,
    isSelected: false,
    isMouseDisabled: false
  }

  private containerRef: React.RefObject<HTMLDivElement>

  constructor(props: Props) {
    super(props)

    this.containerRef = React.createRef<HTMLDivElement>()
  }

  componentDidMount() {
    if (this.props.isFocused) {
      this.scrollToAndFocus('center', 'nearest')
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.isFocused && !prevProps.isFocused) {
      this.scrollToAndFocus('nearest', 'nearest')
    }

    if (!this.props.isFocused && prevProps.isFocused) {
      this.blur()
    }
  }

  private get isDescendable(): boolean {
    return this.props.item.type === DatabaseItemType.DIRECTORY
  }

  private get name(): string {
    return basename(this.props.item.uri)
  }

  private blur() {
    this.containerRef.current?.blur()
  }

  private scrollToAndFocus(block: 'nearest' | 'center', inline: 'nearest' | 'center') {
    this.containerRef.current?.focus({ preventScroll: true })
    this.containerRef.current?.scrollIntoView({ block, inline })
  }

  private handleClick = (event: React.MouseEvent) => {
    if (!this.isDescendable) {
      return
    }

    this.props.onClick(event)
  }

  private handleAddClick = withPropagationStopped(this.props.onAddClick)

  private handlePlayClick = withPropagationStopped(this.props.onPlayClick)

  render() {
    const {
      isSelected,
      isMouseDisabled,
      item,
      onMouseOver
    } = this.props

    const [
      handleMouseOver,
      handleMouseLeave
    ] = isMouseDisabled ? [undefined, undefined] : withCancellableDelay(onMouseOver, MOUSE_OVER_DELAY)

    const containerClassName = cx(styles.container, {
      [styles.selected]: isSelected,
      [styles.hoverable]: !isMouseDisabled,
      [styles.descendable]: this.isDescendable
    })

    return (
      <div
        className={containerClassName}
        ref={this.containerRef}
        role="button"
        tabIndex={-1}
        onClick={this.handleClick}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <span className={styles.name}>
          <DatabaseItemIcon
            className={cx(styles.icon, styles.type)}
            type={item.type}
          />
          {this.name}
        </span>
        <div className={styles.controls}>
          <Button className={styles.button} onClick={this.handleAddClick}>
            <Icons.PlusSquareFill className={cx(styles.icon, styles.add)} />
          </Button>
          <Button className={styles.button} onClick={this.handlePlayClick}>
            <Icons.PlayFill className={cx(styles.icon, styles.replace)} />
          </Button>
        </div>
      </div>
    )
  }
}

export default DatabaseItem
