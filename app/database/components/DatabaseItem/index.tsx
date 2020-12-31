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
  onClick?: React.EventHandler<React.MouseEvent>
  onAddClick?: React.EventHandler<React.MouseEvent>
  onReplaceClick?: React.EventHandler<React.MouseEvent>
  onMouseOver?: React.EventHandler<React.MouseEvent>
}

const DatabaseItem = ({
  item,
  onClick,
  onAddClick,
  onReplaceClick,
  onMouseOver
}: DatabaseItemProps) => {
  const [
    handleMouseOver,
    handleMouseLeave
  ] = withCancellableDelay(onMouseOver, 250)

  const name = basename(item.uri)

  const isDescendable = item.type === DatabaseItemType.DIRECTORY

  const handleClick = isDescendable ? onClick : null
  const handleAddClick = withPropagationStopped(onAddClick)
  const handleReplaceClick = withPropagationStopped(onReplaceClick)

  return (
    <div
      className={cx(styles.container, { [styles.descendable]: isDescendable })}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <span className={styles.name}>
        {name}
      </span>
      <div className={styles.controls}>
        <Button
          shouldStopPropagation
          className={styles.button}
          onClick={handleAddClick}
        >
          <Icons.PlusSquareFill className={cx(styles.icon, styles.add)} />
        </Button>
        <Button
          shouldStopPropagation
          className={styles.button}
          onClick={handleReplaceClick}
        >
          <Icons.PlayFill className={cx(styles.icon, styles.replace)} />
        </Button>
      </div>
    </div>
  )
}

export default DatabaseItem
