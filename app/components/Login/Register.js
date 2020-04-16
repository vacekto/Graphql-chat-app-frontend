import React from "react"

const Register = () => {
  return (
    <div className="base-container">
      <div className="header">Register</div>
      <div className="content">
        <div className="image">
          <img src="" alt="loginImg"/>
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="userName">Username</label>
            <input type="text" name="username" placeholder="userName"/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder="email"/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="text" name="password" placeholder="password"/>
          </div>
        </div>
      </div>
      <div className="footer">
        <button className="btn">Register</button>
      </div>
    </div>
  )
}

export default Register