import * as R from 'ramda'

type Transformer = (x: unknown) => unknown

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pipe = R.pipe as unknown as (...fs: Transformer[]) => (value: unknown) => any

export const thread = (value: unknown, fs: Transformer[]) => {
  const transform = pipe(...fs)

  return transform(value)
}
