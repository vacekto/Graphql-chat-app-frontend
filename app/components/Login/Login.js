import React from "react"
import LoginSvg from "./Login.svg"
import "./Styles.scss"
import { Button } from 'reactstrap';

const Login = () => {
  return (
    <div className="base-container">
      <div className="header">Login</div>
      <div className="content">
        <div className="image">
          <img src={LoginSvg} alt="loginImg"/>
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="userName">Username</label>
            <input type="text" name="username" placeholder="userName"/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="text" name="password" placeholder="password"/>
          </div>
        </div>
      </div>
      <div className="footer">
        <button className="btn">Login</button>
      </div>
    </div>
  )
}

export default Login