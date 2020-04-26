import React from "react"
import "./TopBar.scss"
import { connect } from 'react-redux'

const TopBar = ({channelName}) => (
  <div className="TopBar">
    {channelName}
  </div>
)

const mapStateToProps = (state) => {
  return {
    channelName: state.selectedChannel.channelName
  }
}

export default connect(mapStateToProps)(TopBar)