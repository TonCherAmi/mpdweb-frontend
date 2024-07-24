import React, { useEffect, useMemo } from 'react'

import DatabaseItemLabelsContext from '@app/labels/contexts/DatabaseItemLabelsContext'

import useRemoteData from '@app/common/use/useRemoteData'

import LabelsApi from '@app/labels/api'

const DatabaseItemLabelsProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: labelsByUri, load: loadLabels } = useRemoteData(LabelsApi.get)

  useEffect(() => {
    loadLabels()
  }, [loadLabels])

  const value = useMemo(() => [
    labelsByUri,
    loadLabels,
  ] as const, [labelsByUri, loadLabels])

  return (
    <DatabaseItemLabelsContext.Provider value={value}>
      {children}
    </DatabaseItemLabelsContext.Provider>
  )
}

export default DatabaseItemLabelsProvider
