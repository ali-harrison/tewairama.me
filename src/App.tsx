// App.tsx
import React from 'react'
import Home from './pages/Home'
import './styles/App.css' // Ensure you have necessary styles

function App() {
  return (
    <div className="outer-wrapper">
      <Home />
      <div className="corner-labels">© Crook</div>
    </div>
  )
}

export default App
