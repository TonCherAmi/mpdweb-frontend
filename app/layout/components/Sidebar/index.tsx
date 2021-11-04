import React from 'react'

import { withRouter, RouteComponentProps } from 'react-router'

import cx from 'classnames'

import * as R from 'ramda'

import throttle from 'lodash.throttle'

import Link from '@app/common/components/Link'
import Bindings, { BindingHandlers } from '@app/settings/components/Bindings'

import { ID as SIDEBAR_BINDINGS_ID, SidebarBindingName } from './bindings'

import { items, SidebarItem } from './items'

import styles from './styles.scss'

const SIDEBAR_ITEM_NAVIGATION_THROTTLE_WAIT_MS = 50

interface Props extends RouteComponentProps {
  items: SidebarItem[]
}

class Sidebar extends React.Component<Props> {
  currentItemIndex = this.findCurrentItemIndex()

  componentDidUpdate() {
    this.currentItemIndex = this.findCurrentItemIndex()
  }

  private get bindingHandlers(): BindingHandlers {
    return {
      [SidebarBindingName.NEXT_ITEM]: this.handleNextItemKeyPress,
      [SidebarBindingName.PREV_ITEM]: this.handlePrevItemKeyPress
    }
  }

  private findCurrentItemIndex() {
    return R.findIndex(
      (item) => R.startsWith(
        item.path,
        this.props.location.pathname
      ),
      this.props.items
    )
  }

  private goTo(itemIndex: number) {
    const item = this.props.items[itemIndex]

    if (R.isNil(item)) {
      throw new Error(`invalid sidebar item index ${itemIndex}`)
    }

    this.props.history.push(item.path)
  }

  private handleNextItemKeyPress = throttle(() => {
    if (this.currentItemIndex < this.props.items.length) {
      this.goTo(++this.currentItemIndex)
    }
  }, SIDEBAR_ITEM_NAVIGATION_THROTTLE_WAIT_MS)

  private handlePrevItemKeyPress = throttle(() => {
    if (this.currentItemIndex !== 0) {
      this.goTo(--this.currentItemIndex)
    }
  }, SIDEBAR_ITEM_NAVIGATION_THROTTLE_WAIT_MS)

  render() {
    return (
      <div className={styles.container}>
        <Bindings
          id={SIDEBAR_BINDINGS_ID}
          handlers={this.bindingHandlers}
        />
        <For of={this.props.items} body={({ icon: Icon, ...item }) => (
            <Link
              key={item.path}
              className={cx(styles.item, { [styles.active]: this.props.location.pathname.startsWith(item.path) })}
              to={item.path}
            >
              <Icon className={styles.icon} /> {item.text}
            </Link>
          )}
        />
      </div>
    )
  }
}

const SidebarWithRouter = withRouter(Sidebar)

const SidebarWithItems = () => (
  <SidebarWithRouter items={items} />
)

export default SidebarWithItems
