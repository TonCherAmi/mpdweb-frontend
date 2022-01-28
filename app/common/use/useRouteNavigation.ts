import { useCallback } from 'react'

import { useHistory } from 'react-router-dom'

import Route from '@app/common/types/Route'
import Handler from '@app/common/types/Handler'

import { joinPath } from '@app/common/utils/path'

const useRouteNavigation = <T extends string> (route: Route<T>): Handler<string> => {
  const history = useHistory()

  return useCallback((path) => {
    history.push(
      joinPath([route.path, path])
    )
  }, [route, history])
}

export default useRouteNavigation
