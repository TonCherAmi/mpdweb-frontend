import { useCallback } from 'react'

import { useHistory } from 'react-router-dom'

import * as R from 'ramda'

import Thunk from '@app/common/types/Thunk'

import useFullMatchParam from '@app/common/use/useFullMatchParam'

import { joinPath, dirname } from '@app/common/utils/path'
import { DATABASE_ROOT_URI } from '@app/database/views/DatabaseView/utils'

import route from '@app/database/views/DatabaseView/route'

interface DatabaseViewNavigation {
  goTo: (uri: string) => void
  goBack: Thunk
}

const useDatabaseViewNavigation = (): DatabaseViewNavigation => {
  const history = useHistory()

  const matchUri = useFullMatchParam(route)

  const goTo = useCallback((uri: string) => {
    const path = uri === DATABASE_ROOT_URI
      ? route.path
      : joinPath([route.path, uri])

    history.push(path)
  }, [history])

  const goBack = useCallback(() => {
    const isInRoot = R.isNil(matchUri)

    if (isInRoot) {
      return
    }

    const uri = dirname(matchUri)

    goTo(uri)
  }, [goTo, matchUri])

  return {
    goTo,
    goBack
  }
}

export default useDatabaseViewNavigation
