import { useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Maneger from './components/Maneger'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
    <Navbar />
    <Maneger />
    <Footer />
    </>
  )
}

export default App
