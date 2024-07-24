import { make } from '@app/common/api'

import DatabaseItemLabel from '@app/labels/data/api/DatabaseItemLabel'
import DatabaseItemLabelsByUri from '@app/labels/data/api/DatabaseItemLabelsByUri'
import DatabaseItemLabelCreateBody from '@app/labels/data/api/DatabaseItemLabelCreateBody'
import DatabaseItemLabelDeleteBody from '@app/labels/data/api/DatabaseItemLabelDeleteBody'

const Api = {
  get: make<DatabaseItemLabelsByUri>('/labels'),
  create: make<DatabaseItemLabel, DatabaseItemLabelCreateBody>('/labels', 'post'),
  delete: make<void, DatabaseItemLabelDeleteBody>('/labels/%(id)s', 'delete', {
    path: ['id'],
  }),
}

export default Api
