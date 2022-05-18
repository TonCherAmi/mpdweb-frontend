import DatabaseFile from '@app/database/data/DatabaseFile'

interface QueueItem extends DatabaseFile {
  id: number
  position: number
}

export default QueueItem
