import useRemoteData, { RemoteData, Retrieve } from '@app/common/use/useRemoteData'

export interface RemoteList <E, T extends ReadonlyArray<unknown>> extends Omit<RemoteData<ReadonlyArray<E>, T>, 'data'> {
  items: ReadonlyArray<E>
}

const useRemoteList = <E, T extends ReadonlyArray<unknown>> (retrieve: Retrieve<ReadonlyArray<E>, T>): RemoteList<E, T> => {
  const { data, ...remote } = useRemoteData(retrieve)

  return {
    items: data ?? [],
    ...remote
  }
}

export default useRemoteList
