import './App.css'
import {Routes, Route} from 'react-router-dom'
import Counter from './pages/Counter'
import NotificationPopup from './pages/NotificationPopup'
import Shop from './pages/Shop'
import Nav from './components/Nav'
import JobBoard from './pages/JobBoard'
function App() {

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/notification" element={<NotificationPopup />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/job-board" element={<JobBoard />} />
      </Routes>
    </>
  )
}

export default App
