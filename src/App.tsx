import Home from './pages/Home'
import './styles/App.css'
import SubtleBackground from './components/SubtleBackground'

function App() {
  return (
    <>
      <div className="outer-wrapper">
        <div className="frame">
          <SubtleBackground /> {/* Move inside the frame */}
          <Home />
          <div className="corner-labels">© Crook</div>
        </div>
      </div>
    </>
  )
}

export default App
