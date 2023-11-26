import React from 'react'

import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom'

import HistoryView, { route as HistoryViewRoute } from '@app/history/views/HistoryView'
import SettingsView, { route as SettingsViewRoute } from '@app/settings/views/SettingsView'
import DatabaseView, { route as DatabaseViewRoute } from '@app/database/views/DatabaseView'
import PlaylistsView, { route as PlaylistsViewRoute } from '@app/playlists/views/PlaylistsView'
import DatabaseRecentsView, { route as DatabaseRecentsViewRoute } from '@app/database/views/DatabaseRecentsView'

import Queue from '@app/queue/components/Queue'
import Sidebar from '@app/layout/components/Sidebar'
import UiBlocker from '@app/layout/components/UiBlocker'
import BottomPanel from '@app/layout/components/BottomPanel'

import Providers from '@app/layout/components/Providers'
import DatabaseViewProvider from '@app/database/views/DatabaseView/providers/DatabaseViewProvider'
import PlaylistsViewProvider from '@app/playlists/views/PlaylistsView/providers/PlaylistsViewProvider'

import useUiInteractionModeAttribute from '@app/ui/use/useUiInteractionModeAttribute'
import useGlobalKeybindings from '@app/layout/use/useGlobalKeybindings'
import useDefaultContextMenu from '@app/layout/use/useDefaultContextMenu'
import useQueueToggleKeybinding from '@app/layout/use/useQueueToggleKeybinding'
import useManualScrollRestoration from '@app/navigator/use/useManualScrollRestoration'

import FocusScopeGroupContext from '@app/ui/contexts/FocusScopeGroupContext'

import styles from './styles.scss'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  // TODO: get rid of react router
  // @ts-expect-error: Outdated ReactRouter types
  <Router>
    <Providers>
      {children}
    </Providers>
  </Router>
)

const Wrapped = () => {
  useUiInteractionModeAttribute()
  useGlobalKeybindings()
  useQueueToggleKeybinding()
  useManualScrollRestoration()

  const { handleContextMenu } = useDefaultContextMenu()

  return (
    <React.Fragment>
      <UiBlocker />
      <div className={styles.main} onContextMenu={handleContextMenu}>
        <div className={styles.stack}>
          <Sidebar />
          <FocusScopeGroupContext.Provider value="view">
            <div className={styles.wrapper}>
              <Route exact path="/">
                <Redirect to={DatabaseViewRoute.path} />
              </Route>
              <DatabaseViewProvider>
                <Route path={DatabaseViewRoute.match.pattern}>
                  <DatabaseView />
                </Route>
              </DatabaseViewProvider>
              <PlaylistsViewProvider>
                <Route path={PlaylistsViewRoute.match.pattern}>
                  <PlaylistsView />
                </Route>
              </PlaylistsViewProvider>
              <Route path={DatabaseRecentsViewRoute.match.pattern}>
                <DatabaseRecentsView />
              </Route>
              <Route path={HistoryViewRoute.match.pattern}>
                <HistoryView />
              </Route>
              <Route path={SettingsViewRoute.match.pattern}>
                <SettingsView />
              </Route>
            </div>
          </FocusScopeGroupContext.Provider>
          <FocusScopeGroupContext.Provider value="queue">
            <Queue />
          </FocusScopeGroupContext.Provider>
        </div>
        <BottomPanel />
      </div>
    </React.Fragment>
  )
}

const App = () => (
  <Wrapper>
    <Wrapped />
  </Wrapper>
)

export default App
