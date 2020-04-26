import React from "react"
import "./MessagesContainer.scss"
import MessagesInput from "./MessageInput.js"
import TopBar from "./TopBar.js"
import Messages from "./Messages.js"

const MessagesContainer = () => (
  <div className="MessagesContainer">
    <TopBar />
    <Messages />
    <MessagesInput />
  </div>
)

export default MessagesContainer