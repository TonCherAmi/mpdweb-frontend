import { make } from '@app/common/api'

import HistoryEntry from '@app/history/data/HistoryEntry'
import HistoryGetBody from '@app/history/data/api/request/HistoryGetBody'

const Api = {
  get: make<ReadonlyArray<HistoryEntry>, HistoryGetBody>('/history', 'get', {
    query: ['from', 'to'],
  }),
}

export default Api
