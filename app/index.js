import React from "react"
import ReactDOM from "react-dom"
import "./index.scss"
import Login from "./components/Login/Login.js";
import 'bootstrap/dist/css/bootstrap.css';

class App extends React.Component {
  render() {
    return (
      <div className="hello">
        <Login />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"))