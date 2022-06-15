import useFocusScopeContext from '@app/ui/use/useFocusScopeContext'

const useCanOpenModal = (): boolean => {
  const [focusScope] = useFocusScopeContext()

  return ['view', 'queue'].includes(focusScope)
}

export default useCanOpenModal
