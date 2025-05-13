import Home from './pages/Home'
import './styles/App.css' // Ensure you have necessary styles
import SubtleBackground from './components/SubtleBackground'

function App() {
  return (
    <div className="outer-wrapper">
      {/* Add the grain background */}

      <SubtleBackground />

      <Home />
      <div className="corner-labels">© Crook</div>
    </div>
  )
}

export default App
