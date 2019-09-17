import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { HashRouter } from 'react-router-dom'
import 'leaflet/dist/leaflet.css'

ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById('root'))
