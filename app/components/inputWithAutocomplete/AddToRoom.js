import React, { useState } from "react"
import Downshift from 'downshift'
import { useLazyQuery } from '@apollo/react-hooks';
import { Button, Modal, ModalBody, Input, ModalHeader, ModalFooter, Dropdown, DropdownItem } from 'reactstrap';
import gql from "graphql-tag"


const AddToRoom = ({ userName, setAddUsers, addUsers }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [input, setInput] = useState();
  const [search, { data, error }] = useLazyQuery(gql`
  query($userName: String!){
    searchUser(userName: $userName)
  }`);

  if (data) {
    const users = data.searchUser.filter(user => user !== userName)
    if (JSON.stringify(users) !== JSON.stringify(searchResult)) {
      setSearchResult(users)
    }
  }

  if (error) console.error(error)

  const handleChange = e => {
    setInput(e.target.value)
    search({ variables: { userName: e.target.value } })
  }

  const handleClick = user => {
    if (!addUsers.includes(user)) {
      setAddUsers([...addUsers, user])
    }
  }

  return (
    <Downshift>
      {({ getInputProps, isOpen }) => (
        <div>
          <Input {...getInputProps({
            placeholder: "username..",
            onChange: handleChange
          })} />
          <Dropdown isOpen={isOpen} toggle={() => !isOpen}>
            {isOpen && input ? searchResult.map(user => (
              <DropdownItem key={Math.random()} onClick={() => handleClick(user)}>
                {user}
              </DropdownItem >
            )) : null}
          </Dropdown>
        </div>
      )}
    </Downshift>
  )
}

export default AddToRoom