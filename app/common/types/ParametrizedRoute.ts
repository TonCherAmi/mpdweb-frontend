import Route from '@app/common/types/Route'
import ParametrizedRouteMatch from '@app/common/types/ParametrizedRouteMatch'

interface ParametrizedRoute<T extends string> extends Route {
  match: ParametrizedRouteMatch<T>
}

export default ParametrizedRoute
