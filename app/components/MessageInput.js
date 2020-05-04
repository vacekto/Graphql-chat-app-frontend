import React, { useState } from "react"
import "./MessageInput.scss"
import { sendMessage } from "./graphql.js"
import { connect } from 'react-redux'
import {saveMessage} from "../redux/actionCreators.js"

const MessageInput = ({ userName, channelId, channelType, updateMessages }) => {
  const [text, setText] = useState("")

  const handleSendMessage = () => {
    sendMessage(userName, channelId, text, channelType)
      .then(res => res.json())
      .then(res => {
        if (!res.errors) {
          updateMessages(res.data.sendMessage)
        } else console.log(res.errors[0])
      })
  }
  return (
    <div className="MessageInput">
      <input type="text" placeholder="message.." onChange={(e) => { setText(e.target.value) }} />
      <button onClick={handleSendMessage}>send</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userName: state.userName,
    channelId: state.selectedChannel._id,
    channelType: state.selectedChannel.channelType
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMessages: (message) => { dispatch(saveMessage(message)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageInput)