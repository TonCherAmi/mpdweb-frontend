import * as R from 'ramda'

export const PATH_SEPARATOR = '/'

export const dirname: (
  path: string
) => string = R.pipe(
  R.split(PATH_SEPARATOR),
  R.dropLast(1),
  R.join(PATH_SEPARATOR),
  R.when(R.isEmpty, R.always(PATH_SEPARATOR))
)

export const basename: (
  path: string
) => string = R.pipe<string, string[], string>(
  R.split(PATH_SEPARATOR),
  R.last
)
