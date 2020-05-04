import React from "react"
import "./ManagementContainer.scss"
import Corner from "./Corner.js"
import DirectMessages from "./DirectMessages.js"
import Rooms from "./Rooms.js"
import { useSubscription } from "@apollo/react-hooks";
import { connect } from "react-redux"
import { gql } from "apollo-boost"


const ManagementContainer = ({ userName, saveChannel }) => {
  const { error, data } = useSubscription(
    gql`
    subscription{
      addedToRoom(userName:"${userName}"){
        _id
        members
        channelName
        channelType
        creator
        messages{
          _id
          text
          sender
          date
        }
      }
    }`
  );
  if (data) saveChannel(data.addedToRoom)
  if (error) console.log(error)

  return (
    <div className="ManagementContainer">
      <Corner />
      <div className="lists">
        <DirectMessages />
        <Rooms /> 
      </div>
      <div className="scrollBarContainer"></div>
    </div>
  )
}

const mapStateToProps = state => {
  return { userName: state.userName }
}

const mapDispatchToProps = dispatch => {
  return {
    saveChannel: channel => dispatch({ type: "SAVE_CHANNEL", channel })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManagementContainer)