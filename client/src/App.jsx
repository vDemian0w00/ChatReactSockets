import React from 'react'
import { BrowserRouter , Route, Routes } from 'react-router-dom'

import Signin from './pages/Signin'
import Login from './pages/Login'
import Chat from './pages/Chat'
import Error from './pages/Error'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/app" element={<Chat/>} />
        <Route path="/*" element={<Error/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
