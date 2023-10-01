import useContextMenu from '@app/ui/use/useContextMenu'

const useDefaultContextMenu = () => {
  const { handleContextMenu } = useContextMenu(() => {
    return null
  })

  return { handleContextMenu }
}

export default useDefaultContextMenu
