import { useState } from 'react'
import './App.css'
import { ThemeProvider } from './store/ThemeContext'
import Home from './pages/Home'

function App() {

  return (
    <>
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    </>
  )
}

export default App
