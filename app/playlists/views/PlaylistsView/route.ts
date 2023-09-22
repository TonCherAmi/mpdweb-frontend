import ParametrizedRoute from '@app/common/types/ParametrizedRoute'

const route: ParametrizedRoute<'name'> = {
  path: '/playlists',
  match: {
    param: 'name',
    pattern: '/playlists/:name*',
  },
}

export default route
