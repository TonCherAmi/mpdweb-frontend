import * as R from 'ramda'

import { Binding } from '@app/common/bindings'

type KeyDownHandler = (keyName: string, event?: KeyboardEvent) => void

export interface BindingHandlers {
  [name: string]: KeyDownHandler
}

export interface ConformedBinding {
  keys: string
  allowRepeat: boolean
  onKeyDown: KeyDownHandler
}

const conformKeys = R.join(',')

const conformHandler: (
  KeyDownHandler
) => KeyDownHandler = (handler) => (keyName, event) => {
  event?.preventDefault()
  event?.stopPropagation()

  return handler(keyName, event)
}

export const conformBinding: (handlers: BindingHandlers) => (
  [name, binding]: [string, Binding]
) => Nullable<ConformedBinding> = (handlers) => ([name, binding]) => {
  const handler = handlers[name]

  if (R.isNil(handler)) {
    return null
  }

  return ({
    keys: conformKeys(binding.keys),
    allowRepeat: binding.isRepeatable,
    onKeyDown: conformHandler(handler)
  })
}
