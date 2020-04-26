import React from "react"
import "./Messages.scss"
import { connect } from 'react-redux'

const Messages = ({ messages }) => {
  return (
    <div className="Messages">
      {messages.map(message => {
        return <div className="message" key={Math.random()}>
          {message.text}
        </div>
      })}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    messages: state.selectedChannel.messages,
  }
}

export default connect(mapStateToProps)(Messages)