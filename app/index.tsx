import 'core-js'
import 'regenerator-runtime'

import React from 'react'
import ReactDOM from 'react-dom'

import ReactModal from 'react-modal'

import * as R from 'ramda'

import App from '@app/layout/components/App'

import 'babel-plugin-jsx-control-statements'

import '@app/index.scss'

const appElement = document.getElementById('app')

if (R.isNil(appElement)) {
  throw Error('app element not found')
}

ReactModal.setAppElement(appElement)

ReactDOM.render(<App />, appElement)
