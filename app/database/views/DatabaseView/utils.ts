import * as R from 'ramda'

import { joinPath, splitPath } from '@app/common/utils/path'

export const DATABASE_ROOT_URI = '/'

/**
 * Returns subpaths of a path.
 *
 * @param path - A path.
 * @returns A list of subpaths.
 *
 * @example Subpaths of a/sample/path
 *
 * ## Usage
 * ```ts
 * const subpaths = subpaths('a/sample/path')
 * ```
 *
 * ## Result
 * ```ts
 * ['a', 'a/sample', 'a/sample/path']
 * ```
 */
export const subpaths = (path: string): ReadonlyArray<string> => {
  return R.reduce((acc: ReadonlyArray<string>, value: string): ReadonlyArray<string> => {
    const lastPath = R.last(acc)

    if (R.isNil(lastPath)) {
      return [value]
    }

    const subpath = joinPath([lastPath, value])

    return [...acc, subpath]
  }, [], R.reject(R.isEmpty, splitPath(path)))
}
