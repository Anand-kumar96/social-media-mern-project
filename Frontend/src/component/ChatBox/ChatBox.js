import React, { useEffect, useRef, useState } from 'react'
import { addMessage, getMessages } from '../../api/MessageRequest'
import { getUser } from '../../api/UserRequest'
import './ChatBox.css'
import InputEmoji from 'react-input-emoji'
import { format } from 'timeago.js'

const ChatBox = ({ chat, currentUser, setSendMessage, recieveMessage }) => {
  const [userData, setUserData] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState()
  const scroll = useRef()

  //fetching data for header of chatBox
  const handleChange = (newMessage) => {
    setNewMessage(newMessage)
  }
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser)
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId)
        setUserData(data.user)
      } catch (err) {
        console.log(err)
      }
    }
    if (chat != null) getUserData()
  }, [chat, currentUser])

  // fetching data for message

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id)
        setMessages(data.result)
        // console.log(data)
        // console.log(currentUser)
      } catch (err) {
        console.log(err)
      }
    }
    if (chat != null) fetchMessages()
  }, [chat])

  const handleSend = async (text) => {
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    }
    // send message to socket server
    const receiverId = chat.members.find((id) => id !== currentUser)
    setSendMessage({ ...message, receiverId })

    // send message to database
    try {
      if (text !== '' && newMessage !== '') {
        const { data } = await addMessage(message)
        setMessages([...messages, data.result])
        setNewMessage('')
      }
    } catch (err) {
      console.log(err)
    }
  }
  // Receive Message from parent component
  useEffect(() => {
    if (recieveMessage !== null && recieveMessage.chatId === chat._id) {
      setMessages([...messages, recieveMessage])
    }
  }, [recieveMessage])

  //Always scroll to last message....  // find on stack Overflow
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src={
                      userData?.profilePicture
                        ? process.env.REACT_APP_PUBLIC_FOLDER +
                          userData.profilePicture
                        : process.env.REACT_APP_PUBLIC_FOLDER +
                          'defaultProfile.png'
                    }
                    className="followerImage"
                    style={{
                      width: '40px',
                      height: '40px',
                      margin: '0px 3px',
                      borderRadius:'50%'
                    }}
                    alt=""
                  />
                  <div className="name" style={{ fontSize: '0.8rem', color:'white' }}>
                    <span>{`${userData?.firstname} ${userData?.lastname}`}</span>
                  </div>
                </div>
              </div>
              <hr style={{ width: '98%', border: '0.2px solid #ececec' }} />
            </div>

            {/* chat box message */}
            <div className="chat-body">
              {messages.map((message, index) => (
                <div
                  ref={scroll}
                  className={
                    message.senderId === currentUser ? 'message own' : 'message'
                  }
                  key={index}
                >
                  <span>{message.text}</span>
                  <span>{format(message.createdAt)}</span>
                </div>
              ))}
            </div>

            {/* chat sender */}
            <div className="chat-sender">
              <div>+</div>
              <InputEmoji
                value={newMessage}
                onChange={handleChange}
                onEnter={handleSend}
              />
              <div className="send-button button" onClick={handleSend}>
                Send
              </div>
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a Chat to start Converstation....
          </span>
        )}
      </div>
    </>
  )
}

export default ChatBox

// time ago to find time ago
