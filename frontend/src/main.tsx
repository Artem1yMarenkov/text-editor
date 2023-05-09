import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import "@/shared/assets/scss/index.scss"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
