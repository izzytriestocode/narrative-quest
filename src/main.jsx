import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import N6 from './N6.jsx'
import N7 from './N7.jsx'
import Header from './Header.jsx'
import { DarkModeProvider } from './DarkModeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DarkModeProvider>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<N7 />} />
          <Route path="/n6" element={<N6 />} />
          <Route path="/n7" element={<N7 />} />
        </Routes>
      </Router>
    </DarkModeProvider>
  </StrictMode>,
)
