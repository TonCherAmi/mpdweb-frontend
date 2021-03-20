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
  item: DatabaseItemDto
  isSelected: boolean
  onClick: React.EventHandler<React.MouseEvent>
  onAddClick?: React.EventHandler<React.MouseEvent>
  onPlayClick?: React.EventHandler<React.MouseEvent>
  onMouseOver?: React.EventHandler<React.MouseEvent>
}

const MOUSE_OVER_DELAY = 400 // ms

class DatabaseItem extends React.Component<Props> {
  private containerRef: React.RefObject<HTMLDivElement>

  constructor(props: Props) {
    super(props)

    this.containerRef = React.createRef<HTMLDivElement>()
  }

  componentDidMount() {
    if (this.props.isSelected) {
      this.scrollToAndFocus('center', 'nearest')
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.isSelected && !prevProps.isSelected) {
      this.scrollToAndFocus('nearest', 'nearest')
    }
  }

  private get name() {
    return basename(this.props.item.uri)
  }

  private scrollToAndFocus(block: 'nearest' | 'center', inline: 'nearest' | 'center') {
    this.containerRef.current?.focus({ preventScroll: true })
    this.containerRef.current?.scrollIntoView({ block, inline })
  }

  private handleClick = (event: React.MouseEvent) => {
    if (this.props.item.type !== DatabaseItemType.DIRECTORY) {
      return
    }

    this.props.onClick(event)
  }

  private handleAddClick = withPropagationStopped(this.props.onAddClick)

  private handlePlayClick = withPropagationStopped(this.props.onPlayClick)

  render() {
    const { item, onMouseOver } = this.props

    const [
      handleMouseOver,
      handleMouseLeave
    ] = withCancellableDelay(onMouseOver, MOUSE_OVER_DELAY)

    const isDescendable = item.type === DatabaseItemType.DIRECTORY

    return (
      <div
        className={cx(styles.container, { [styles.descendable]: isDescendable })}
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
