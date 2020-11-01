import 'core-js'
import 'regenerator-runtime'

import 'babel-plugin-jsx-control-statements'

import React from 'react'
import ReactDOM from 'react-dom'

import Main from '@app/layout/components/Main'

import '@app/index.scss'

ReactDOM.render(
  <Main />,
  document.getElementById('app')
)
