import React, { useState } from "react"
import "./Rooms.scss"
import { connect } from "react-redux"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap';


const Rooms = ({ rooms, selectChannel }) => {
  if (!rooms) rooms = []
  const [roomName, setRoomName] = useState("")
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const createRoom = () => {

  }

  return (
    <div className="Rooms">
      Rooms:
      <br />
      <Button color="primary" onClick={toggle} size="sm">create room</Button>
      {rooms.map(room => {
        return <div key={Math.random()} onClick={() => { selectChannel(room._id) }}>
          {room.channelName}
        </div>
      })}
      <Modal isOpen={modal} toggle={toggle} >
        <ModalBody>
          <Input type="text" id="exampleEmail" placeholder="username.." />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={createRoom}>find</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div >
  )
}

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectChannel: (_id) => { dispatch({ type: "SELECT_CHANNEL", channelType: "room", _id }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms)