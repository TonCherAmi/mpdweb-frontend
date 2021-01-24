import * as R from 'ramda'

import Query from 'qs'
import { sprintf } from 'sprintf-js'

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

const API_PREFIX = '/api'

const makePath = <T> (data: T, pathKeys: string[]) => (template: string): string => {
  const prefixedTemplate = `${API_PREFIX}${template}`

  if (R.isEmpty(pathKeys)) {
    return prefixedTemplate
  }

  const pathData = R.pick(pathKeys, data)

  if (R.isEmpty(pathData)) {
    throw Error('api: empty path data')
  }

  return sprintf(prefixedTemplate, pathData)
}

const addQuery = <T> (data: T, queryKeys: string[]) => (path: string): string => {
  if (R.isEmpty(queryKeys)) {
    return path
  }

  const queryData = R.pick(queryKeys, data)

  if (R.isEmpty(queryData)) {
    throw Error('api: empty query data')
  }

  const query = Query.stringify(queryData)

  return `${path}?${query}`
}

const makeEndpoint = <T> (
  template: string,
  data: T,
  pathKeys: string[],
  queryKeys: string[]
): string => {
  const make = R.compose(
    addQuery(data, queryKeys),
    makePath(data, pathKeys)
  )

  return make(template)
}

export const make = <R, T = null> (
  template: string,
  method: HttpMethod = HttpMethod.GET, {
    path: pathKeys = [],
    query: queryKeys = []
  }: { path?: string[], query?: string[] } = {}
) => async (data: T = null): Promise<R> => {
  const getBody = R.pipe(
    R.ifElse(
      R.isNil,
      R.always(null),
      R.omit(R.concat(pathKeys, queryKeys))
    ),
    R.when(R.isEmpty, R.always(null)),
    R.unless(R.isNil, JSON.stringify),
  )

  const body = getBody(data)
  const endpoint = makeEndpoint(template, data, pathKeys, queryKeys)

  const result = await fetch(endpoint, {
    body,
    method,
    headers: new Headers([['Content-Type', 'application/json']])
  })

  return result
    .json()
    .catch(R.always(null))
}
