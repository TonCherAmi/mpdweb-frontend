import { useLocation, useRouteMatch } from 'react-router-dom'

import * as R from 'ramda'

import Route from '@app/common/types/Route'

export const useFullMatchParam = <T extends string> (route: Route<T>): Nullable<string> => {
  const location = useLocation()

  const routeMatch = useRouteMatch<Record<T, string>>({
    path: route.match.pattern
  })?.params?.[route.match.param]

  if (R.isNil(routeMatch)) {
    return null
  }

  const hash = location.hash
  const search = location.search

  return routeMatch + search + hash
}

export default useFullMatchParam
