import React from 'react'

import cx from 'classnames'

import * as R from 'ramda'

import DatabaseItemDto from '@app/database/dto/DatabaseItem'
import DatabaseItemType from '@app/database/dto/enums/DatabaseItemType'

import * as Icons from '@app/common/icons'

import Button from '@app/common/components/Button'
import DatabaseItemIcon from '@app/database/components/DatabaseItemIcon'

import { basename } from '@app/common/utils/path'
import { withPropagationStopped } from '@app/common/utils/event'

import styles from './styles.scss'

export enum DatabaseItemHighlightStyle {
  MUTED = 'MUTED',
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY'
}

export enum DatabaseItemRoundedCornersPosition {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

interface Props {
  isClickable: boolean
  isMouseDisabled: boolean
  item: DatabaseItemDto
  highlightStyle: Nullable<DatabaseItemHighlightStyle>
  roundedCornersPositions: DatabaseItemRoundedCornersPosition[]
  onClick?: React.EventHandler<React.MouseEvent>
  onAddClick?: React.EventHandler<React.MouseEvent>
  onPlayClick?: React.EventHandler<React.MouseEvent>
}

class DatabaseItem extends React.Component<Props> {
  static defaultProps = {
    isClickable: true,
    isMouseDisabled: false,
    roundedCornersPositions: [DatabaseItemRoundedCornersPosition.LEFT]
  }

  private readonly containerRef = React.createRef<HTMLDivElement>()

  scrollIntoView(scrollIntoViewOptions: ScrollIntoViewOptions) {
    this.containerRef.current?.scrollIntoView(scrollIntoViewOptions)
  }

  private get isClickable(): boolean {
    return this.props.isClickable
      && this.props.item.type === DatabaseItemType.DIRECTORY
  }

  private get name(): string {
    return basename(this.props.item.uri)
  }

  private readonly handleClick = (event: React.MouseEvent) => {
    if (!this.isClickable) {
      return
    }

    this.props.onClick?.(event)
  }

  private readonly handleAddClick = withPropagationStopped(this.props.onAddClick)

  private readonly handlePlayClick = withPropagationStopped(this.props.onPlayClick)

  render() {
    const {
      isMouseDisabled,
      highlightStyle,
      item
    } = this.props

    const containerClassName = cx(styles.container, {
      [styles.hoverable]: !isMouseDisabled,
      [styles.clickable]: this.isClickable
    })

    const highlightStyleClassName = cx({
      [styles.highlighted]: !R.isNil(highlightStyle),
      [styles.muted]: highlightStyle === DatabaseItemHighlightStyle.MUTED,
      [styles.primary]: highlightStyle === DatabaseItemHighlightStyle.PRIMARY,
      [styles.secondary]: highlightStyle === DatabaseItemHighlightStyle.SECONDARY
    })

    const roundedCornersClassName = cx(styles.rounded, {
      [styles.left]: this.props.roundedCornersPositions.includes(DatabaseItemRoundedCornersPosition.LEFT),
      [styles.right]: this.props.roundedCornersPositions.includes(DatabaseItemRoundedCornersPosition.RIGHT)
    })

    return (
      <div
        ref={this.containerRef}
        className={cx(containerClassName, highlightStyleClassName, roundedCornersClassName)}
        role="button"
        tabIndex={-1}
        onClick={this.handleClick}
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
