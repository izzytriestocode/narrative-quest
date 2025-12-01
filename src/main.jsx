import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import N1 from './N1.jsx'
import N2 from './N2.jsx'
import N3 from './N3.jsx'
import N4 from './N4.jsx'
import N5 from './N5.jsx'
import N6 from './N6.jsx'
import N7 from './N7.jsx'
import N8 from './N8.jsx'
import Header from './Header.jsx'
import { DarkModeProvider } from './DarkModeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DarkModeProvider>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<N7 />} />
          <Route path="/n1" element={<N1 />} />
          <Route path="/n2" element={<N2 />} />
          <Route path="/n3" element={<N3 />} />
          <Route path="/n4" element={<N4 />} />
          <Route path="/n5" element={<N5 />} />
          <Route path="/n6" element={<N6 />} />
          <Route path="/n7" element={<N7 />} />
          <Route path="/n8" element={<N8 />} />
        </Routes>
      </Router>
    </DarkModeProvider>
  </StrictMode>,
)
