import React from "react"
import "./Corner.scss"
import { connect } from 'react-redux'
import { fetchLogin } from "./graphql.js"

const Corner = ({ userName, login }) => (
  <div className="Corner">
    <button onClick={()=>{fetchLogin("tom", "tom").then(res => res.json()).then(res => login(res.data))}}>log in</button>
    {userName}
  </div>
)

const mapStateToProps = state => {
  return {
    userName: state.userName
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (data) => {
      dispatch({ type: "LOGIN", data })
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Corner)