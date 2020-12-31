import React from 'react'

import StatusSubscriber from '@app/status/subscribers/StatusSubscriber'
import ChangesSubscriber from '@app/changes/subscribers/ChangesSubscriber'

import statusHandler from '@app/status/handlers/StatusHandler'
import changesHandler from '@app/changes/handlers/ChangesHandler'

import BottomPanel from '@app/layout/components/BottomPanel'
import DatabaseView from '@app/database/components/DatabaseView'

import StatusStore from "@app/status/stores/StatusStore"
import PlaylistStore from '@app/playlist/stores/PlaylistStore'

import styles from './styles.scss'

class Main extends React.Component<{}> {
  private statusSubscriber: StatusSubscriber
  private changesSubscriber: ChangesSubscriber

  constructor(props: {}) {
    super(props)

    this.statusSubscriber = new StatusSubscriber(statusHandler)
    this.changesSubscriber = new ChangesSubscriber(changesHandler)
  }

  componentDidMount() {
    StatusStore.retrieve()
    PlaylistStore.retrieve()
  }

  render() {
    return (
      <div className={styles.main}>
        <div className={styles.stack}>
          <div className={styles.sidebar}>
            <span>Sidebaar</span>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.content}>
              <DatabaseView />
            </div>
          </div>
        </div>
        <BottomPanel />
      </div>
    )
  }
}

export default Main
