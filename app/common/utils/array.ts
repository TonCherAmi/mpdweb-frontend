import * as R from 'ramda'

const comparator = <T> (a: T, b: T): R.Ordering => {
  if (a < b) {
    return -1
  }

  if (a === b) {
    return 0
  }

  return 1
}

interface BinarySearch {
  <E> (xs: ReadonlyArray<E>, key: E): number
  <E, K> (xs: ReadonlyArray<E>, key: K, accessor: (x: E) => K): number
}

// Adapted from java.util.Arrays
export const binarySearch: BinarySearch = (
  xs: ReadonlyArray<unknown>,
  key: unknown,
  accessor: (x: unknown) => unknown = R.identity,
): number => {
  let low = 0
  let high = xs.length - 1

  while (low <= high) {
    const middle = (low + high) >>> 1

    const value = accessor(xs[middle])

    const cmp = comparator(value, key)

    if (cmp < 0) {
      low = middle + 1
    } else if (cmp > 0) {
      high = middle - 1
    } else {
      return middle
    }
  }

  return -(low + 1)
}
