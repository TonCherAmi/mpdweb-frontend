import useAnyFocusScopeActive from '@app/ui/use/useAnyFocusScopeActive'

const useCanOpenModal = (): boolean => {
  return useAnyFocusScopeActive(['view', 'queue'])
}

export default useCanOpenModal
