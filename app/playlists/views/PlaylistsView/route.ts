import Route from '@app/common/types/Route'

const route: Route<'name'> = {
  path: '/playlists',
  match: {
    param: 'name',
    pattern: '/playlists/:name*'
  }
}

export default route
