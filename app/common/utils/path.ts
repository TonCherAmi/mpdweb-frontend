import * as R from 'ramda'

export const PATH_SEPARATOR = '/'

export const joinPath = R.join(PATH_SEPARATOR)

export const splitPath = R.split(PATH_SEPARATOR)

export const dirname = R.pipe(
  splitPath,
  R.dropLast(1) as (xs: ReadonlyArray<string>) => ReadonlyArray<string>,
  joinPath,
  R.when(R.isEmpty, R.always(PATH_SEPARATOR))
) as (path: string) => string

export const basename = R.pipe(
  splitPath,
  R.last
) as (path: string) => string
