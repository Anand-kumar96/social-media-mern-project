import React, { useEffect, useRef, useState } from 'react'
import './Chat.css'
import LogoSearch from '../../component/LogoSearch'
import { useSelector } from 'react-redux'
import { userChats } from '../../api/ChatRequest'
import Converstation from '../../component/Converstation/Converstation'
import NavIcons from '../../component/NavIcons'
import ChatBox from '../../component/ChatBox/ChatBox'
import { io } from 'socket.io-client'

const Chat = () => {
  const socket = useRef()
  const { user } = useSelector((state) => state.authReducer.authData)
  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [sendMessage, setSendMessage] = useState(null)
  const [recieveMessage, setRecieveMessage] = useState(null)

  const showChatUser = useSelector((state) => state.profileReducer)
  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id)
        setChats(data.chat)
      } catch (err) {
        console.log(err)
      }
    }
    getChats()
  }, [user._id])

  //  Connect to Socket.io
  useEffect(() => {
    socket.current = io('https://chat-socket-io-1933.onrender.com')
    socket.current.emit('new-user-add', user._id)
    socket.current.on('get-users', (users) => {
      setOnlineUsers(users)
      // console.log(onlineUsers)
    })
  }, [user])

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit('send-message', sendMessage)
    }
  }, [sendMessage])

  // Recieve Message from socket server

  useEffect(() => {
    socket.current.on('recieve-message', (data) => {
      setRecieveMessage(data)
    })
  })
  //  for online users
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id)
    const online = onlineUsers.find((user) => user.userId === chatMember)
    return online ? true : false
  }
  return (
    <div className={`Chat ${showChatUser ? 'Chat-responsive' : 'Chats'}`}>
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats?.map((chat, index) => (
              <div key={index} onClick={() => setCurrentChat(chat)}>
                <Converstation
                  data={chat}
                  currentUserId={user._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className="Right-side-chat">
        <div
          className="nav-responsive"
          style={{
            width: '20rem',
            alignSelf: 'flex-end',
          }}
        >
          <NavIcons />
          {/* Chat Body */}
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          recieveMessage={recieveMessage}
        />
      </div>
    </div>
  )
}

export default Chat
