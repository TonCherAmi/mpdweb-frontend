import { useMemo } from 'react'

import * as R from 'ramda'

import { Crumb } from '@app/common/components/Crumbs'
import DatabaseDirectory from '@app/database/views/DatabaseView/types/DatabaseDirectory'

import useDatabaseViewNavigation from '@app/database/views/DatabaseView/use/useDatabaseViewNavigation'

import { basename } from '@app/common/utils/path'

const useDatabaseViewCrumbs = (
  directories: ReadonlyArray<DatabaseDirectory>
): ReadonlyArray<Crumb> => {
  const { goTo } = useDatabaseViewNavigation()

  return useMemo(() => (
    R.tail(directories).map((directory) => ({
      label: basename(directory.uri),
      onClick: () => goTo(directory.uri)
    }))
  ), [directories, goTo])
}

export default useDatabaseViewCrumbs
