import React from "react"
import ManagementContainer from "./ManagementContainer.js"
import MessagesContainer from "./MessagesContainer.js"
import "./Chat.scss"
import { useSubscription } from "@apollo/react-hooks";
import { gql } from "apollo-boost"
import { connect } from "react-redux"
import { saveMessage } from "../redux/actionCreators.js"

const Chat = ({ userName, updateMessages }) => {
  const { error, data } = useSubscription(
    gql`
    subscription{
      getMessages(userName:"${userName}"){
        text
        sender
        _id
        date
        channelType
        channelId
      }
    }
    `
  );
  if (data) {
    updateMessages(data.getMessages)
  }
  console.log("chat rendered")
  return (
    <div className="chatContainer">
      <div className="Chat">
        <ManagementContainer />
        <MessagesContainer />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userName: state.userName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMessages: (message) => { dispatch(saveMessage(message)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)