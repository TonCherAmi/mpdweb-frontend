import * as R from 'ramda'

export const SLASH = '/'

export const dirname: (
  path: string
) => string = R.pipe(
  R.split(SLASH),
  R.dropLast(1),
  R.join(SLASH),
  R.when(R.isEmpty, R.always(SLASH))
)

export const basename: (
  path: string
) => string = R.pipe<string, string[], string>(
  R.split(SLASH),
  R.last
)
