import useRemoteData, { RemoteData, Retrieve } from '@app/common/use/useRemoteData'

export interface RemoteList <T, E> extends Omit<RemoteData<T, ReadonlyArray<E>>, 'data'> {
  items: ReadonlyArray<E>
}

const useRemoteList = <T, E> (retrieve: Retrieve<T, ReadonlyArray<E>>): RemoteList<T, E> => {
  const { data, ...remote } = useRemoteData(retrieve)

  return {
    items: data ?? [],
    ...remote
  }
}

export default useRemoteList
