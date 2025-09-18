import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import AccountProviderWrapper from './context/account.context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AccountProviderWrapper>
        <App />
      </AccountProviderWrapper>
    </Router>    
  </StrictMode>,
)
