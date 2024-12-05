import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './components/pages/frontend/homepage/homepage'
import Single from './components/pages/frontend/single/Single'
import Blog from './components/pages/backend/Blog/blog'
import { StoreProvider } from './components/Store/storeContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'





const App = () => {
  const queryClient = new QueryClient();
  return (
    <div>
      <StoreProvider>
      <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route index element={<Homepage/>}/>
          <Route path='/single' element={<Single/>}/>
          <Route path='/blog' element={<Blog/>}/>
        </Routes>
      </Router>
      </QueryClientProvider>
      </StoreProvider>
      
    </div>
  )
}

export default App

