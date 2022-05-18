import DatabaseFile from '@app/database/data/DatabaseFile'

interface PlaylistItem extends DatabaseFile {
  id: number
  position: number
}

export default PlaylistItem
