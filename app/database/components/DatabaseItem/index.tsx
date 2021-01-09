import React from 'react'

import cx from 'classnames'

import DatabaseItemDto from '@app/database/dto/DatabaseItem'
import DatabaseItemType from '@app/database/dto/enums/DatabaseItemType'

import * as Icons from '@app/common/icons'

import Button from '@app/common/components/Button'

import { basename } from '@app/common/utils/path'
import { withCancellableDelay } from '@app/common/utils/delay'
import { withPropagationStopped } from '@app/common/utils/event'

import styles from './styles.scss'

interface DatabaseItemProps {
  item: DatabaseItemDto
  isSelected: boolean
  onClick?: React.EventHandler<React.MouseEvent>
  onAddClick?: React.EventHandler<React.MouseEvent>
  onReplaceClick?: React.EventHandler<React.MouseEvent>
  onMouseOver?: React.EventHandler<React.MouseEvent>
}

const MOUSE_OVER_DELAY = 250 // ms

class DatabaseItem extends React.Component<DatabaseItemProps> {
  private containerRef: React.RefObject<HTMLDivElement>

  constructor(props: DatabaseItemProps) {
    super(props)

    this.containerRef = React.createRef<HTMLDivElement>()
  }

  componentDidMount() {
    if (this.props.isSelected) {
      this.containerRef.current?.focus()
    }
  }

  componentDidUpdate(prevProps: DatabaseItemProps) {
    if (this.props.isSelected && !prevProps.isSelected) {
      this.containerRef.current?.focus()
    }
  }

  render() {
    const {
      item,
      onClick,
      onAddClick,
      onReplaceClick,
      onMouseOver
    } = this.props

    const [
      handleMouseOver,
      handleMouseLeave
    ] = withCancellableDelay(onMouseOver, MOUSE_OVER_DELAY)

    const name = basename(item.uri)

    const isDescendable = item.type === DatabaseItemType.DIRECTORY

    const handleClick = isDescendable ? onClick : null
    const handleAddClick = withPropagationStopped(onAddClick)
    const handleReplaceClick = withPropagationStopped(onReplaceClick)

    return (
      <div
        className={cx(styles.container, { [styles.descendable]: isDescendable })}
        ref={this.containerRef}
        role="button"
        tabIndex={-1}
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <span className={styles.name}>
          <Icons.FolderFill className={cx(styles.icon, styles.folder)} />
          {name}
        </span>
        <div className={styles.controls}>
          <Button className={styles.button} onClick={handleAddClick}>
            <Icons.PlusSquareFill className={cx(styles.icon, styles.add)} />
          </Button>
          <Button className={styles.button} onClick={handleReplaceClick}>
            <Icons.PlayFill className={cx(styles.icon, styles.replace)} />
          </Button>
        </div>
      </div>
    )
  }
}

export default DatabaseItem
