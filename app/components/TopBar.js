import React, { useState } from "react"
import "./TopBar.scss"
import { connect } from 'react-redux'
import { Button, Modal, ModalBody, Input, ModalHeader, ModalFooter, Dropdown, DropdownItem } from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';
import gql from "graphql-tag"
import AddToRoom from "./inputWithAutocomplete/AddToRoom.js"
import { leaveRoom } from "./graphql.js"


const TopBar = ({ channel, userName, updateRooms }) => {

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [addUsers, setAddUsers] = useState([])
  let label, action;

  const [addPeopleToRoom, { data, error }] = useMutation(gql`
  mutation($roomId: ID!, $users:[String!]){
    addPeopleToRoom(roomId: $roomId, users: $users)
  }`);
  if (error) console.error(error)
  if (data) console.log(data)

  const handleAddPeople = () => {
    addPeopleToRoom({ variables: { roomId: channel._id, users: addUsers } })
  }
  const handleLeaveRoom = () => {
    leaveRoom(userName, channel._id)
      .then(res => res.json())
      .then(res => updateRooms(res.data.leaveRoom))
  }
  if (channel.channelType === "directChannel") {
    label = "befriend"
    action = () => {
    }
  } else {
    if (channel.creator === userName) {
      label = "add people"
      action = toggle
    } else {
      label = "leave room"
      action = handleLeaveRoom
    }
  }

  return (
    <div className="TopBar">
      {channel.channelName}
      {channel.channelName === "Public" ?
        null :
        <Button onClick={action}  >
          {label}
        </Button>
      }
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} >add people</ModalHeader>
        <ModalBody>
          {addUsers.map(user => user + " ")}
          <AddToRoom userName={userName} setAddUsers={setAddUsers} addUsers={addUsers} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleAddPeople}>
            add
            </Button>
          <Button color="secondary" onClick={toggle} >Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    channel: state.selectedChannel,
    userName: state.userName,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateRooms: (roomId) => dispatch({ type: "LEAVE_ROOM", roomId })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar)