import * as R from 'ramda'

import { Crumb } from '@app/common/components/Crumbs'

import { PATH_SEPARATOR } from '@app/common/utils/path'

export const uriToCrumbs = (uri: string, pathPrefix: string): Crumb[] => {
  const toCrumbs: (uri: string) => Crumb[] = R.pipe(
    R.split(PATH_SEPARATOR),
    R.reject(R.isEmpty),
    R.ifElse(
      R.isEmpty,
      R.always([]),
      R.reduce(
        (acc: Crumb[], item: string) => (
          R.append({
            path: R.concat(
              R.last(acc)?.path ?? '',
              `${PATH_SEPARATOR}${item}`
            ),
            label: item
          }, acc)
        ), [])
    ),
    R.map<Crumb, Crumb>(
      R.evolve({ path: R.concat(pathPrefix) })
    )
  )

  return toCrumbs(uri)
}
