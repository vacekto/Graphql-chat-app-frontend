import React, { useState } from "react"
import Downshift from 'downshift'
import { Input, Dropdown, DropdownItem } from 'reactstrap';
import { useLazyQuery } from '@apollo/react-hooks';
import gql from "graphql-tag"

const UserAutocomplete = ({ setInput, input }) => {
  const [users, setUsers] = useState([]);
  const [search, { data, error }] = useLazyQuery(gql`
  query($userName: String!){
    searchUser(userName: $userName)
  }`);

  const handleChange = e => {
    setInput(e.target.value)
    if (e.target.value.length === 0) {
      setUsers([])
    }
    else search({ variables: { userName: e.target.value } })
  }

  if (data && JSON.stringify(data.searchUser) !== JSON.stringify(users)) setUsers(data.searchUser)
  if (error) console.error(error)

  return (
    <Downshift>
      {({ getInputProps, isOpen }) => (
        <div>
          <Input {...getInputProps({
            placeholder: "username..",
            onChange: handleChange
          })} />
          <Dropdown isOpen={isOpen} toggle={() => !isOpen}>
            {isOpen && input ? users.map(user => (
              <DropdownItem key={Math.random()} onClick={() => setUsers(user)}>
                {user}
              </DropdownItem >
            )) : null}
          </Dropdown>
        </div>
      )}
    </Downshift>
  )
}


export default UserAutocomplete