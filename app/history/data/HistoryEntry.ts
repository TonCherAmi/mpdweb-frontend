import DatabaseTags from '@app/database/data/DatabaseTags'

interface HistoryEntry {
  id: number
  uri: string
  tags: DatabaseTags
  recordedAt: string
}

export default HistoryEntry
