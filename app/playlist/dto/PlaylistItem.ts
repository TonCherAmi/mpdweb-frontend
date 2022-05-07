import DatabaseFile from '@app/database/dto/DatabaseFile'

interface PlaylistItem extends DatabaseFile {
  id: number
  position: number
}

export default PlaylistItem
