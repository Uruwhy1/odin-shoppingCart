import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import './global-styles/reset.css'
import './global-styles/fonts.css'
import './global-styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
