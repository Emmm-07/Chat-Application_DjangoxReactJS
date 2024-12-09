import { useState,useEffect } from 'react'
import './index.css'
import axios from 'axios'
import ChatPanel from './ChatPanel'

function App() {
 
  return (

  <div className="App bg-red-500 w-full h-screen flex flex-col items-center justify-center">
      <ChatPanel/>
  </div>
  )
}

export default App
