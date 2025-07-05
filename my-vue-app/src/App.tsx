import './App.css'
import {Routes, Route} from 'react-router-dom'
import Counter from './pages/Counter'
import NotificationPopup from './pages/NotificationPopup'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/notification" element={<NotificationPopup />} />
      </Routes>
    </>
  )
}

export default App
