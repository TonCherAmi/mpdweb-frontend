import { useMemo, useState } from 'react'

import * as R from 'ramda'

import Fuse from 'fuse.js'

import useInput, { Input } from '@app/common/use/useInput'

import { normalize } from '@app/common/utils/string'

interface ItemSearch<T> {
  input: Input
  results: ReadonlyArray<T>
}

const useItemSearch = <T,>(
  items: ReadonlyArray<T>,
  accessor: (item: T) => string
): ItemSearch<T> => {
  const fuse = useMemo(() => {
    const getFn = R.pipe(accessor, normalize)

    return new Fuse(items, { getFn, keys: [''] })
  }, [items, accessor])

  const [results, setResults] = useState(items)

  const input = useInput('', (value) => {
    if (R.isEmpty(value)) {
      setResults(items)

      return
    }

    setResults(
      fuse.search(value).map(
        R.prop('item')
      )
    )
  })

  return { input, results }
}

export default useItemSearch
