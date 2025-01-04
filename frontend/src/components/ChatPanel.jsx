import { useState,useEffect } from 'react'
import '../index.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ChatPanel = () => {
    const [messages,setMessages] = useState([]);
    const [newMessage,setNewMessage] = useState('');
    const [ws,setWs] = useState(null);
    const [user,setUser] = useState(localStorage.getItem('fn'));
    const navigate = useNavigate();
    const [friendList,setFriendList] = useState([]);
    const [recipientId,setRecipientId] = useState(null);

    const handleSendMessage = () => {
      if (ws && newMessage.trim()) {
          ws.send(JSON.stringify({ message: newMessage, user: user, recipientId: recipientId }));   //+++++++++++++++++
          setNewMessage(''); // Clear the input field
      }   
    };
    
    const handleLogout = () =>{
        localStorage.clear();
        navigate("/login");
    }
    useEffect(()=>{
       // Fetch messages from the API on load
      //  axios.get('/api/messages/')
      //  .then(response => {
      //   console.log("DATA: " + response.data)
      //    setMessages(response.data); // Use response.data directly
      //  })
      //  .catch(error => {
      //    console.log("Error fetching messages:", error);
      //  });

                                                                //GET the FriendList from backend +++++++++++++++++++
        const token = localStorage.getItem('access');
        setUser(localStorage.getItem('fn'))
        var fList = localStorage.getItem('friendList');
        fList = JSON.parse(fList);
        setFriendList(fList);
        console.log("Friendlist: ")
        console.log(fList);


        //Create websocket connection
        const socket = new WebSocket(`ws://127.0.0.1:8000/ws/socketserver/?token=${token}`);
        setWs(socket);
        socket.onopen = () => {
          console.log("WebSocket connection established");
          };
          
        socket.onmessage = (event) => {
          try{
            const msgData =  JSON.parse(event.data);
            console.log("Message from server: ");
            console.log(msgData);
  
            setMessages((prevMessages)=>{
              console.log("Previous msg");
              console.log(prevMessages);
              return [...prevMessages,msgData];
            });
            console.log("success set messages")
           
          }catch(error){
            console.log(error);
          }
        
        };
        
        socket.onclose = (event) => {
            console.error("WebSocket closed: ", event);
        };
        
        socket.onerror = (error) => {
            console.error("WebSocket error: ", error);
            alert("Error: Websocket server unreachable!");
        };
    
        console.log("Hello there");
        
        return () => socket.close();
    },[])
  
    return (  
        <>

            <h2>Friend list:</h2>
            {friendList.map((friend,idx)=>(
                <>
                <div key={idx}                                                        
                    className='border hover:bg-white'
                    onClick={()=>setRecipientId(friend.id)}              //Edit this to take ID per friend +++++++
                >
                    {friend.first_name} {friend.last_name}
                </div>
               
                </>
            ))

            }
            <h1 className="text-white text-3xl font-bold">Chat Room</h1>
{/*             
            <input 
                type="text" 
                value={user}
                onChange={(e) => setUser(e.target.value)}
                // disabled={?true:false}
            /> */}
            <h2>Hello, {user}</h2>

            <div className="chatContainer bg-white p-4 rounded shadow-md w-1/2">
            {/* Render messages */}
            {messages.map((msg, idx) => (
                <div key={idx} className={`border-b border-gray-300 w-[40%] rounded-lg py-2 my-3 ${msg.user == user? 'bg-blue-500 ml-auto':'bg-gray-500'}`} >
                  {msg.user}:{msg.message}
                </div>
            ))}
            </div>

            <div className="chatInput flex gap-2 mt-4">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="border p-2 rounded w-full"
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Send
                </button>
            </div>

                <button
                    onClick={handleLogout}
                    className="bg-black text-white mt-11 px-4 py-2 rounded-full hover:bg-blue-600"
                >
                    Logout
                </button>
        </>
    );
}
 
export default ChatPanel;