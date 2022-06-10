import 'core-js'
import 'regenerator-runtime'

import React from 'react'
import { createRoot } from 'react-dom/client'

import * as R from 'ramda'

import App from '@app/layout/components/App'

import 'babel-plugin-jsx-control-statements'

import '@app/index.scss'

const appElement = document.getElementById('app')

if (R.isNil(appElement)) {
  throw Error('app element not found')
}

const root = createRoot(appElement)

root.render(<App />)
