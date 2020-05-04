import React, { useState } from "react"
import "./DirectMessages.scss"
import { connect } from 'react-redux'
import { fetchDirectChannel } from "./graphql.js"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap';
import UserAutocomplete from "./inputWithAutocomplete/FindUser.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const DirectMessages = ({ directMessages, selectChannel, userName, addChannel, selectedChannelId }) => {
  if (!directMessages) directMessages = []
  const [input, setInput] = useState("")
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleClick = () => {
    fetchDirectChannel(userName, input)
      .then(res => res.json())
      .then(res => {
        if (res.errors) throw new Error(res.errors[0].message)
        addChannel(res.data.fetchDirectChannel)
      }).catch(err => console.error(err))
  }
  return (
    <div className="DirectMessages">
      <div className="header">
        <span>Direct Messages</span>
        <div className="iconWreapper" onClick={toggle}>
          <div className="icon">
            <FontAwesomeIcon className="icon" icon={faPlus} />
          </div>
        </div>
      </div>
      <div className="list">
        {directMessages.map(channel => {
          return (
            <div
              key={channel._id}
              className={"channelWrapper" +
                (selectedChannelId === channel._id ?
                  " selected" : "")}
              onClick={() => { selectChannel(channel._id) }}
            >
              <div
                key={channel._id}
                className="channel"
              >
                {channel.channelName}
              </div>
            </div>
          )
        })}
      </div>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalBody>
          <UserAutocomplete setInput={setInput} input={input} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleClick}>find</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    directMessages: state.directChannels,
    userName: state.userName,
    selectedChannelId: state.selectedChannel._id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectChannel: (_id) => { dispatch({ type: "SELECT_CHANNEL", channelType: "directChannel", _id }) },
    addChannel: channel => { dispatch({ type: "SAVE_CHANNEL", channel }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DirectMessages)