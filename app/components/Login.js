import React, { useState } from "react"
import "./Login.scss"
import { fetchLogin, fetchRegister } from "./graphql.js"
import { connect } from 'react-redux'

import { Button, Form, FormGroup, Label, Input } from "reactstrap"

const Login = ({ login, history }) => {
  const [userName, setUserName] = useState("")
  const [passport, setPass] = useState("")

  const handleUserNameChange = e => {
    setUserName(e.target.value);
  }
  const handlePasswordChange = e => {
    setPass(e.target.value);
  }

  const handleLogin = () => {
    fetchLogin(userName, passport)
      .then(res => res.json())
      .then(res => {
        if (!res.errors) {
          
          login(res.data)
          history.push("/chat")
        } else throw new Error(res.errors)
      })
  }

  const handleRegister = () => {
    fetchRegister(userName, passport)
      .then(res => res.json())
      .then(res => {
      })
  }

  return (
    <Form className="form">
      <h1>
        <span className="font-weight-bold"> My Chat-app</span>
      </h1>
      <h2>Welcome</h2>
      <FormGroup>
        <Label>Username</Label>
        <Input
          type="test"
          placeholder="Username"
          onChange={handleUserNameChange}
          autoComplete="true"
        />
        <Label>Password</Label>
        <Input
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
          autoComplete="true"
        />
        <div className="buttons">
          <Button onClick={handleLogin}>Log in</Button>
          <Button onClick={handleRegister}>Registre</Button>
        </div>
      </FormGroup>
    </Form>

  )
}

const mapDispatchToProps = dispatch => {
  return {
    login: (data) => {
      dispatch({ type: "LOGIN", data })
    },
  }
}

export default connect(null, mapDispatchToProps)(Login)
