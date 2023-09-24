import { useCallback } from 'react'

import { useHistory } from 'react-router-dom'

import Handler from '@app/common/types/Handler'
import ParametrizedRoute from '@app/common/types/ParametrizedRoute'

import { joinPath } from '@app/common/utils/path'

const useRouteNavigation = <T extends string> (route: ParametrizedRoute<T>): Handler<string> => {
  const history = useHistory()

  return useCallback((path) => {
    history.push(
      joinPath([route.path, path])
    )
  }, [route, history])
}

export default useRouteNavigation
