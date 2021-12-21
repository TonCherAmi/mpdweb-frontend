import React from 'react'

import { withRouter, RouteComponentProps } from 'react-router'

import { reaction } from 'mobx'
import { observer } from 'mobx-react'

import * as R from 'ramda'

import DatabaseItem from '@app/database/dto/DatabaseItem'

import DatabaseDirectory from '@app/database/components/DatabaseDirectory'
import ScrollableContainer from '@app/common/components/ScrollableContainer'
import { DatabaseItemRoundedCornersPosition } from '@app/database/components/DatabaseItem'

import PlaylistService from '@app/playlist/services/PlaylistService'
import PlaybackService from '@app/playback/services/PlaybackService'

import { dirname, joinPath } from '@app/common/utils/path'
import { getFullMatchParamFromProps } from '@app/common/utils/router'

import DatabaseViewStore from './store'

import Route from './route'

import { DATABASE_ROOT_URI } from './utils'

import styles from './styles.scss'

@observer
class DatabaseView extends React.Component<RouteComponentProps> {
  private readonly store = DatabaseViewStore

  private readonly scrollableContainerRef = React.createRef<ScrollableContainer>()

  private readonly onComponentDidUpdate: (() => unknown)[] = []

  componentDidMount() {
    this.setCurrentDirectory(this.currentMatchUri)
  }

  componentDidUpdate(prevProps: RouteComponentProps) {
    const prevMatchUri = getFullMatchParamFromProps(Route.match.param, prevProps)

    if (prevMatchUri !== this.currentMatchUri) {
      this.setCurrentDirectory(this.currentMatchUri)
    }

    while (this.onComponentDidUpdate.length > 0) {
      const fn = this.onComponentDidUpdate.pop()

      fn?.()
    }
  }

  componentWillUnmount() {
    this.itemsReactionDisposer()
  }

  private readonly itemsReactionDisposer = reaction(() => this.store.directoryStores, () => {
    this.scrollableContainerRef.current?.scrollRight()
  }, { scheduler: fn => this.onComponentDidUpdate.push(fn) })

  private get currentMatchUri(): Nullable<string> {
    return getFullMatchParamFromProps(Route.match.param, this.props)
  }

  private get isInRoot(): boolean {
    return R.isNil(this.currentMatchUri)
  }

  private setCurrentDirectory(uri: Nullable<string>) {
    this.store.reset(
      uri
      ?? DATABASE_ROOT_URI
    )
  }

  private goToRoot() {
    if (this.isInRoot) {
      return
    }

    this.props.history.push(Route.path)
  }

  private goTo(uri: string) {
    if (R.equals(uri, DATABASE_ROOT_URI)) {
      this.goToRoot()

      return
    }

    const path = joinPath([Route.path, uri])

    this.props.history.push(path)
  }

  private goBack() {
    if (R.isNil(this.currentMatchUri)) {
      return
    }

    const uri = dirname(this.currentMatchUri)

    this.goTo(uri)
  }

  private readonly handleAdd = async (item: DatabaseItem) => {
    await PlaylistService.add(item.uri)
  }

  private readonly handlePlay = async (item: DatabaseItem) => {
    await PlaylistService.clear()
    await PlaylistService.add(item.uri)
    await PlaybackService.toggle()
  }

  private handleAscent = () => {
    this.goBack()
  }

  private handleDescent = (item: DatabaseItem) => {
    this.goTo(item.uri)
  }

  private renderDirectory = (path: string, index: number | undefined): Nullable<JSX.Element> => {
    if (R.isNil(index) || index >= this.store.directoryStores.length) {
      return null
    }

    const directoryStore = this.store.directoryStores[index]

    const nextDirectory = index + 1 === this.store.paths.length
      ? null
      : this.store.paths[index + 1]

    const roundedCornerPositions = index !== 0 ? [] : [DatabaseItemRoundedCornersPosition.LEFT]

    const isActive = R.isNil(nextDirectory)

    return (
      <DatabaseDirectory
        key={path}
        isActive={isActive}
        store={directoryStore}
        highlightedItemUri={nextDirectory}
        roundedCornersPositions={roundedCornerPositions}
        onAdd={this.handleAdd}
        onPlay={this.handlePlay}
        onAscent={this.handleAscent}
        onDescent={this.handleDescent}
      />
    )
  }

  render() {
    return (
      <ScrollableContainer ref={this.scrollableContainerRef} className={styles.container}>
        <For of={this.store.paths} body={this.renderDirectory} />
      </ScrollableContainer>
    )
  }
}

export { Route }

export default withRouter(DatabaseView)
