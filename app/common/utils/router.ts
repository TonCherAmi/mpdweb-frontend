import { RouteChildrenProps } from 'react-router'

import * as R from 'ramda'

export const getFullMatchParamFromProps = (
  param: string,
  props: RouteChildrenProps
): Nullable<string> => {
  const match = props.match?.params?.[param]

  if (R.isNil(match)) {
    return null
  }

  const search = props.location.search
  const hash = props.location.hash

  return match + search + hash
}
