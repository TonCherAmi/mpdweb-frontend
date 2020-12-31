import * as R from 'ramda'

const SLASH = '/'

export const dirname = R.pipe(
  R.split(SLASH),
  R.dropLast(1),
  R.join(SLASH),
  R.when(R.isEmpty, R.always(SLASH))
)

export const basename = R.pipe(
  R.split(SLASH),
  R.last
)
