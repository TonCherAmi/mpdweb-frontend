import { useLocation, useRouteMatch } from 'react-router-dom'

import * as R from 'ramda'

import ParametrizedRoute from '@app/common/types/ParametrizedRoute'

export const useFullMatchParam = <T extends string> (route: ParametrizedRoute<T>): Nullable<string> => {
  const location = useLocation()

  const routeMatch = useRouteMatch<Record<T, string>>({
    path: route.match.pattern,
  })?.params?.[route.match.param]

  if (R.isNil(routeMatch)) {
    return null
  }

  const hash = location.hash
  const search = location.search

  return routeMatch + search + hash
}

export default useFullMatchParam
