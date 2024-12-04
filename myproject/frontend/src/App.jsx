import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [messages,setMessages] = useState([]);
  const [newMessage,setNewMessage] = useState('');
  const [ws,setWs] = useState(null);

  const handleSendMessage = () => {
    if (ws && newMessage.trim()) {
        ws.send(JSON.stringify({ message: newMessage }));
        setNewMessage(''); // Clear the input field
      
    }
    
  };

  useEffect(()=>{
     // Fetch messages from the API on load
      axios.get('/api/messages/'

      ).then(response=>response.json
      ).then(data=>setMessages(data)
      ).catch(error=>{
        console.log(error);
      })

      //Create websocket connection
      const socket = new WebSocket('ws://127.0.0.1:8000/ws/socketserver/');
      setWs(socket);
      socket.onopen = () => {
        console.log("WebSocket connection established");
        };
        
      socket.onmessage = (event) => {
          console.log("Message from server: ", event.data.message);
          const msgData =  JSON.parse(e.data);
          setMessages((prevMessages)=>[...prevMessages,msgData]);
      };
      
      socket.onclose = (event) => {
          console.error("WebSocket closed: ", event);
      };
      
      socket.onerror = (error) => {
          console.error("WebSocket error: ", error);
      };
  
      console.log("Hello there");
      // return () => socket.close();
  },[])

  return (

    <div className="App">
        <h1>Chat Room</h1>
        <div>
          {messages && messages.map((msg,idx)=>{
              <div key={idx}>{msg.content || msg.message}</div>
              console.log("HIIII")
          })}
        </div>
        <button onClick={handleSendMessage}>Send</button> 
        <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />


    </div>
  )
}

export default App
