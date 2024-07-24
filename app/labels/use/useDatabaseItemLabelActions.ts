import { useMemo } from 'react'

import DatabaseItemLabel from '@app/labels/data/api/DatabaseItemLabel'

import LabelsApi from '@app/labels/api'

interface Actions {
  create: (data: {
    uri: string,
    scope: string,
    key: string,
    value: string
  }) => Promise<DatabaseItemLabel>;
  remove: (id: string) => Promise<void>;
}

const useDatabaseItemLabelActions = (): Actions => {
  return useMemo(() => ({
    create: (data) => LabelsApi.create(data),
    remove: (id) => LabelsApi.delete({ id }),
  }), [])
}

export default useDatabaseItemLabelActions
