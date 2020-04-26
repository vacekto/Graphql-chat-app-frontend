import React from "react"
import "./ManagementContainer.scss"
import Corner from "./Corner.js"
import DirectMessages from "./DirectMessages.js"
import Rooms from "./Rooms.js"

const ManagementContainer = () => (
  <div className="ManagementContainer">
    <Corner />
    <DirectMessages />
    <Rooms />
  </div>
)

export default ManagementContainer