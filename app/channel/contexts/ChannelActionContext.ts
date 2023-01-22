import { createContext } from 'react'

import { Channel } from '@app/channel/use/useChannel'

const noop = () => {
  throw Error('ChannelActionContext provider required')
}

const ChannelActionContext = createContext<Channel['perform']>(noop)

export default ChannelActionContext
