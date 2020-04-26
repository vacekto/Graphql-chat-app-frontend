import React, { useState } from "react"
import "./DirectMessages.scss"
import { connect } from 'react-redux'
import { fetchDirectChannel } from "./graphql.js"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap';

const DirectMessages = ({ directMessages, selectChannel, userName, addChannel }) => {
  if (!directMessages) directMessages = []
  const [input, setInput] = useState("")
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleClick = () => {
    fetchDirectChannel(userName, input)
      .then(res => res.json())
      .then(res => {
        if (res.errors) throw new Error(res.errors[0].message)
        addChannel(res.data.directChannel)
      }).catch(err => console.log(err))
  }
  return (
    <div className="DirectMessages">
      DirectMessages:
      <Button color="primary" onClick={toggle} size="sm">find user</Button>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalBody>
          <Input type="text" id="exampleEmail" placeholder="username.." onChange={(e) => { setInput(e.target.value) }} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleClick}>find</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
      {directMessages.map(channel => {
        return <div key={Math.random()} onClick={() => { selectChannel(channel._id) }}>
          {channel.channelName}
        </div>
      })}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    directMessages: state.directChannels,
    userName: state.userName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectChannel: (_id) => { dispatch({ type: "SELECT_CHANNEL", channelType: "directChannel", _id }) },
    addChannel: (directChannel) => { dispatch({ type: "ADD_CHANNEL", directChannel }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DirectMessages)