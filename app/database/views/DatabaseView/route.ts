import ParametrizedRoute from '@app/common/types/ParametrizedRoute'

const route: ParametrizedRoute<'uri'> = {
  path: '/database',
  match: {
    param: 'uri',
    pattern: '/database/:uri*',
  },
}

export default route
