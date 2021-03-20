import * as R from 'ramda'

import { Crumb } from '@app/common/components/Crumbs'

import { SLASH } from '@app/common/utils/path'

export const uriToCrumbs = (uri: string, pathPrefix: string): Crumb[] => {
  const toCrumbs: (uri: string) => Crumb[] = R.pipe(
    R.split(SLASH),
    R.reject(R.isEmpty),
    R.ifElse(
      R.isEmpty,
      R.always([]),
      R.reduce(
        (acc: Crumb[], item: string) => (
          R.append({
            path: R.concat(
              R.last(acc)?.path ?? '',
              `${SLASH}${item}`
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
