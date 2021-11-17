import React from 'react'

import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom'

import * as R from 'ramda'

import Status from '@app/status/dto/Status'
import Change from '@app/changes/dto/enums/Change'

import StatusSubscriptionRegistry from '@app/status/registries/StatusSubscriptionRegistry'
import ChangesSubscriptionRegistry from '@app/changes/registries/ChangesSubscriptionRegistry'

import Sidebar from '@app/layout/components/Sidebar'
import BottomPanel from '@app/layout/components/BottomPanel'

import DatabaseView, { Route as DatabaseViewRoute } from '@app/database/views/DatabaseView'
import DatabaseSearchView, { Route as DatabaseSearchViewRoute } from '@app/database/views/DatabaseSearchView'

import StatusStore from '@app/status/stores/StatusStore'

import styles from './styles.scss'

class App extends React.Component {
  constructor(props: Record<string, never>) {
    super(props)

    StatusSubscriptionRegistry.subscribe(this.handleStatusNotify)
    ChangesSubscriptionRegistry.subscribe(this.handleChangesNotify)
  }

  componentDidMount() {
    StatusStore.retrieve()
  }

  componentWillUnmount() {
    StatusSubscriptionRegistry.unsubscribe(this.handleStatusNotify)
    ChangesSubscriptionRegistry.unsubscribe(this.handleChangesNotify)
  }

  handleStatusNotify = (status: Status) => {
    StatusStore.set(status)
  }

  handleChangesNotify = (changes: Change[]) => {
    const isStatusUpdateNeeded = !R.isEmpty(
      R.intersection(changes, [Change.MIXER, Change.PLAYER])
    )

    if (isStatusUpdateNeeded) {
      StatusStore.retrieve()
    }
  }

  render() {
    return (
      <Router>
        <div className={styles.main}>
          <div className={styles.stack}>
            <Sidebar />
            <div className={styles.wrapper}>
              <div className={styles.content}>
                <Switch>
                  <Route exact path="/">
                    <Redirect to={DatabaseViewRoute.path} />
                  </Route>
                  <Route path={DatabaseViewRoute.match.pattern}>
                    <DatabaseView />
                  </Route>
                  <Route path={DatabaseSearchViewRoute.match.pattern}>
                    <DatabaseSearchView />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
          <BottomPanel />
        </div>
      </Router>
    )
  }
}

export default App
