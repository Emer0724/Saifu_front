import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import MainMenu from './pages/MainMenu.tsx'
import Records from './pages/Records.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/menu" element={<MainMenu />} />
        <Route path="/records" element={<Records />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
