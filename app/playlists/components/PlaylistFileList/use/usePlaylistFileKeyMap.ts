import { useMemo } from 'react'

import * as R from 'ramda'

import DatabaseFile from '@app/database/data/DatabaseFile'

/**
 * Generates a map of persistent keys for each file in the playlist,
 * taking into account potential duplicate files.
 */
const usePlaylistFileKeyMap = (files: ReadonlyArray<DatabaseFile>): Map<DatabaseFile, string> => {
  return useMemo(() => {
    const filesGroupedByUri = R.groupBy(R.prop('uri'), files)

    const fileToKeyPairs = R.toPairs(filesGroupedByUri)
      .map(([uri, files]) => {
        return files.map((file, index) => [file, `${uri}-${index}`] as const)
      })
      .flat()

    return new Map(fileToKeyPairs)
  }, [files])
}

export default usePlaylistFileKeyMap
