import Route from '@app/common/types/Route'

const route: Route<'uri'> = {
  path: '/database',
  match: {
    param: 'uri',
    pattern: '/database/:uri*',
  },
}

export default route
