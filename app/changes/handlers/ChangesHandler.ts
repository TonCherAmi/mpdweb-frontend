import * as R from 'ramda'

import Change from '@app/changes/dto/enums/Change'
import Handler from '@app/common/handlers/Handler'

import StatusStore from '@app/status/stores/StatusStore'
import PlaylistStore from '@app/playlist/stores/PlaylistStore'

const handle = (change: Change) => {
  switch (change) {
    case Change.MIXER:
    case Change.PLAYER:
      StatusStore.retrieve()

      break
    case Change.PLAYLIST:
      PlaylistStore.retrieve()

      break
  }
}

const handler: Handler<Change[]> = (changes: Change[]) => {
  R.forEach(handle, changes)
}

export default handler
