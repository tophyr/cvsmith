import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CV from './CV.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CV />
  </StrictMode>,
)
