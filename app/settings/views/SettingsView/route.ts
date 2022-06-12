import Route from '@app/common/types/Route'

const route: Route<'section'> = {
  path: '/settings',
  match: {
    param: 'section',
    pattern: '/settings/:section*',
  },
}

export default route
