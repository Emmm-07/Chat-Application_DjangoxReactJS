import { useState,useEffect } from 'react'
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import './index.css'
import axios from 'axios'
import ChatPanel from './components/ChatPanel'
import Login from './components/Login'
import Signup from './components/Signup'
import PrivateRoute from './components/PrivateRoute'
// to run on local network: npm run dev -- --host 0.0.0.0  

function App() {
  

  return (

  <div className="App bg-[#333] w-full h-screen content-center">
    <div className="container bg-red-500 w-[70%] h-[85%] flex flex-col items-center justify-center justify-self-center rounded-xl">
      <BrowserRouter>
        <Routes>

          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/signup" element={<Signup/>} />

          {/* Private Routes */}
          <Route exact path="/" element={<Navigate to="/chat_panel"/>} />     
          <Route exact path="/chat_panel" 
            element={<PrivateRoute element={<ChatPanel/>}/>}
          />
         

        </Routes> 
      </BrowserRouter> 

    </div>
  </div>
  )
}

export default App
