import React from 'react'

import { observer } from 'mobx-react'

import ReactHotkeys from 'react-hot-keys'

import * as R from 'ramda'

import { Binding } from '@app/common/bindings'

import BindingsStore from '@app/settings/stores/BindingsStore'

import {
  BindingHandlers,
  ConformedBinding,
  conformBinding
} from './utils'

interface Props {
  id: string
  handlers: BindingHandlers
}

@observer
class Bindings extends React.Component<Props> {
  get bindings(): ConformedBinding[] {
    const conformx = conformBinding(this.props.handlers)

    const conformxs: (
      bindings: Record<string, Binding>
    ) => ConformedBinding[] = R.pipe(
      R.toPairs,
      R.map(conformx),
      R.reject(R.isNil) as <T> (xs: Nullable<T>[]) => T[]
    )

    const commonBindings = BindingsStore.common
    const specificBindings = BindingsStore.bindings[this.props.id]

    const bindings = R.mergeRight(commonBindings, specificBindings)

    return conformxs(bindings)
  }

  render() {
    return (
      <For of={this.bindings} body={(item: ConformedBinding) => (
        <ReactHotkeys
          key={item.keys}
          keyName={item.keys}
          allowRepeat={item.allowRepeat}
          onKeyDown={item.onKeyDown}
        />
      )} />
    )
  }
}

export type { BindingHandlers }

export default Bindings
