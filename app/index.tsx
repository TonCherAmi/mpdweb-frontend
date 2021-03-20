import 'core-js'
import 'regenerator-runtime'

import 'babel-plugin-jsx-control-statements'

import React from 'react'
import ReactDOM from 'react-dom'

import App from '@app/layout/components/App'

import '@app/index.scss'

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
