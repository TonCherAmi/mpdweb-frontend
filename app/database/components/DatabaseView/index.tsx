import React from 'react'

import { observer } from 'mobx-react'

import cx from 'classnames'

import DatabaseItem from '@app/database/components/DatabaseItem'
import DatabaseViewMainHeader from '@app/database/components/DatabaseViewMainHeader'
import DatabaseViewPreviewHeader from '@app/database/components/DatabaseViewPreviewHeader'

import PlaybackStore from '@app/playback/stores/PlaybackStore'
import PlaylistStore from '@app/playlist/stores/PlaylistStore'
import DatabaseStore, { DATABASE_ROOT_URI } from '@app/database/stores/DatabaseStore'

import styles from './styles.scss'

@observer
class DatabaseView extends React.Component {
  componentDidMount() {
    DatabaseStore.retrieveMain()
  }

  handleHome = () => {
    DatabaseStore.clearPreview()
    DatabaseStore.retrieveMain(DATABASE_ROOT_URI)
  }

  handleAscent = () => {
    DatabaseStore.clearPreview()
    DatabaseStore.retrieveMainParent()
  }

  handleDescent = (uri: string) => () => {
    DatabaseStore.retrieveMain(uri)
  }

  handlePreview = (uri: string) => () => {
    DatabaseStore.retrievePreview(uri)
  }

  handleAdd = (uri: string) => async () => {
    await PlaylistStore.add(uri)
  }

  handleReplace = (uri: string) => async () => {
    await PlaylistStore.clear()
    await PlaylistStore.add(uri)
    await PlaybackStore.toggle()
  }

  render() {
    const mainItems = DatabaseStore.mainItems

    return (
      <div className={cx(styles.container, styles.row)}>
        <div className={cx(styles.container, styles.column)}>
          <DatabaseViewMainHeader
            uri={DatabaseStore.uri.main}
            onHomeClick={this.handleHome}
            onBackClick={this.handleAscent}
          />
          <div className={styles.scrollable}>
            <For of={mainItems} body={(item) => (
              <DatabaseItem
                key={item.uri}
                item={item}
                onClick={this.handleDescent(item.uri)}
                onMouseOver={this.handlePreview(item.uri)}
                onAddClick={this.handleAdd(item.uri)}
                onReplaceClick={this.handleReplace(item.uri)}
              />
            )} />
          </div>
        </div>
        <div className={cx(styles.container, styles.column)}>
          <DatabaseViewPreviewHeader uri={DatabaseStore.uri.preview} />
          <div className={styles.scrollable}>
            <For of={DatabaseStore.previewItems} body={(item) => (
              <DatabaseItem
                key={item.uri}
                item={item}
                onClick={this.handleDescent(item.uri)}
                onAddClick={this.handleAdd(item.uri)}
                onReplaceClick={this.handleReplace(item.uri)}
              />
            )} />
          </div>
        </div>
      </div>
    )
  }
}

export default DatabaseView
