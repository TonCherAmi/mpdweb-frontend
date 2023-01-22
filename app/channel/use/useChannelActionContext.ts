import { useContext } from 'react'

import Action from '@app/channel/data/Action'

import ChannelActionContext from '@app/channel/contexts/ChannelActionContext'

export const SUCCESS_CODE = 0

const useChannelActionContext = (): (action: Action) => void => {
  const perform = useContext(ChannelActionContext)

  return async (action) => {
    try {
      const response = await perform(action)

      if (response.code !== SUCCESS_CODE) {
        console.error(`an error occurred when performing action: ${response.message}`)
      }
    } catch (e) {
      console.error(`caught error when performing action: ${e}`)
    }
  }
}

export default useChannelActionContext
