import { useMemo, useRef, useCallback, useEffect } from 'react'

import * as R from 'ramda'

import { Crumb } from '@app/common/components/Crumbs'
import DatabaseDirectory from '@app/database/views/DatabaseView/types/DatabaseDirectory'

import { basename } from '@app/common/utils/path'

const useDatabaseViewCrumbs = (
  directories: ReadonlyArray<DatabaseDirectory>
): [ReadonlyArray<Crumb>, (instance: HTMLDivElement, uri: string) => void] => {
  const directoryContainerInstancesRef = useRef<Record<string, HTMLDivElement>>({})

  useEffect(() => {
    directoryContainerInstancesRef.current = {}
  }, [directories])

  const crumbs = useMemo(() => (
    R.tail(directories).map((directory) => ({
      label: basename(directory.uri),
      onClick: () => {
        directoryContainerInstancesRef.current[directory.uri]
          ?.scrollIntoView({ inline: 'start', behavior: 'smooth' })
      },
    }))
  ), [directories])

  const handleDatabaseDirectoryRef = useCallback((instance: HTMLDivElement, uri: string) => {
    directoryContainerInstancesRef.current[uri] = instance
  }, [])

  return [crumbs, handleDatabaseDirectoryRef]
}

export default useDatabaseViewCrumbs
