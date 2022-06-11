import { make } from '@app/common/api'

import Playlist from '@app/playlists/data/Playlist'
import DatabaseFile from '@app/database/data/DatabaseFile'
import PlaylistRenamingRequest from '@app/playlists/data/api/request/PlaylistRenamingRequest'
import PlaylistDeletionRequest from '@app/playlists/data/api/request/PlaylistDeletionRequest'
import PlaylistFilesRequest from '@app/playlists/data/api/request/PlaylistFilesRequest'
import PlaylistFilesDeletionRequest from '@app/playlists/data/api/request/PlaylistFilesDeletionRequest'

const Api = {
  get: make<ReadonlyArray<Playlist>>('/playlists', 'get'),
  delete: make<void, PlaylistDeletionRequest>('/playlists/%(name)s', 'delete', {
    path: ['name'],
  }),
  rename: make<void, PlaylistRenamingRequest>('/playlists/%(name)s', 'post', {
    path: ['from'],
  }),
  files: {
    get: make<ReadonlyArray<DatabaseFile>, PlaylistFilesRequest>('/playlists/%(name)s/files', 'get', {
      path: ['name'],
    }),
    delete: make<void, PlaylistFilesDeletionRequest>('/playlists/%(name)s/files', 'delete', {
      path: ['name'],
    }),
  },
}

export default Api
