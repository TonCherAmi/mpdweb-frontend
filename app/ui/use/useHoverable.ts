import { useEffect } from 'react'

import * as R from 'ramda'

import Handler from '@app/common/types/Handler'

import useUiInteractionModeContext from '@app/ui/use/useUiInteractionModeContext'

const HOVERABLE_CLASS_NAME = 'hoverable'

const useHoverable = () => {
  const { isMouse, setMouse } = useUiInteractionModeContext()

  useEffect(() => {
    const getMouseMoveHandler = (): Handler<MouseEvent> | undefined => {
      if (isMouse) {
        return undefined
      }

      return (mouseEvent) => {
        if (mouseEvent.movementX !== 0 || mouseEvent.movementY !== 0) {
          setMouse()
        }
      }
    }

    const handleMouseMove = getMouseMoveHandler()

    if (R.isNil(handleMouseMove)) {
      return
    }

    document.body.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isMouse, setMouse])

  useEffect(() => {
    const getWheelHandler = (): Handler<WheelEvent> | undefined => {
      if (isMouse) {
        return undefined
      }

      return setMouse
    }

    const handleWheel = getWheelHandler()

    if (R.isNil(handleWheel)) {
      return
    }

    document.body.addEventListener('wheel', handleWheel)

    return () => {
      document.body.removeEventListener('wheel', handleWheel)
    }
  }, [isMouse, setMouse])

  useEffect(() => {
    document.body.classList.toggle(HOVERABLE_CLASS_NAME)
  }, [isMouse])
}

export default useHoverable
