import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './components/pages/frontend/homepage/homepage'



const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route index element={<Homepage/>}/>
        </Routes>
      </Router>
      
    </div>
  )
}

export default App

