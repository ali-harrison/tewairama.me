import React from 'react'
import Home from './pages/Home'
import './styles/App.css' // Ensure you have necessary styles
import GrainBackground from './components/Grainbackground'

function App() {
  return (
    <div className="outer-wrapper">
      {/* Add the grain background */}
      <GrainBackground
        intensity={0.01}
        blurAmount={0.5}
        animate={true}
        color1="#000000"
        color2="#ffffff"
      />

      <Home />
      <div className="corner-labels">© Crook</div>
    </div>
  )
}

export default App
