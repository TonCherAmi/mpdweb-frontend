import RouteMatch from '@app/common/types/RouteMatch'

interface ParametrizedRouteMatch<T extends string> extends RouteMatch {
  param: T
}

export default ParametrizedRouteMatch
