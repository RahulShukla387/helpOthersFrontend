import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import "leaflet/dist/leaflet.css";
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='260234864105-qbr3lsghhg170ek7l40ntk4r7t1eu6gf.apps.googleusercontent.com' >
    <BrowserRouter>  
      <App/>
  </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
)
