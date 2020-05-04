import React, { useState } from "react"
import "./Rooms.scss"
import { connect } from "react-redux"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap';
import { createRoom } from "./graphql.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const Rooms = ({ rooms, selectChannel, saveRoom, userName, selectedChannelId }) => {
  if (!rooms) rooms = []
  const [roomName, setRoomName] = useState("")
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const handleCreateRoom = () => {
    createRoom(roomName, userName)
      .then(res => res.json())
      .then(res => saveRoom(res.data.createRoom))
  }

  return (
    <div className="Rooms">
      <div className="header">
        <span>Rooms</span>
        <div className="iconWreapper" onClick={toggle}>
          <FontAwesomeIcon className="icon" icon={faPlus} />
        </div>
      </div>
      <div className="list">
        {rooms.map(room => {
          return (
            <div
              key={room._id}
              className={"channelWrapper" +
                (selectedChannelId === room._id ?
                  " selected" : "")}
              onClick={() => { selectChannel(room._id) }}
            >
              <div
                key={room._id}
                className="channel"
              >
                {room.channelName}
              </div>
            </div>
          )
        })}
      </div>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle} >Create room</ModalHeader>
        <ModalBody>
          <Input
            type="text"
            id="exampleEmail"
            placeholder="roomName"
            onChange={e => setRoomName(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleCreateRoom}>ok</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div >
  )
}

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms,
    userName: state.userName,
    selectedChannelId: state.selectedChannel._id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectChannel: _id => { dispatch({ type: "SELECT_CHANNEL", channelType: "room", _id }) },
    saveRoom: channel => { dispatch({ type: "SAVE_CHANNEL", channel }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms)