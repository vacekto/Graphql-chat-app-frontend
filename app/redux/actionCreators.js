import { fetchDirectChannel } from "../components/graphql.js"

export const saveMessage = message => {
  return (dispatch, getState) => {
    if (message.channelType === "directChannel") {
      const state = getState()
      const directChannel = state.directChannels.find(channel => channel._id === message.channelId)
      if (!directChannel) {
        fetchDirectChannel(state.userName, message.sender)
          .then(res => res.json())
          .then(res => {
            dispatch({ type: "ADD_CHANNEL", directChannel: res.data.directChannel })
          })
      } else {
        dispatch({ type: "NEW_MESSAGE", message })
      }
    }
  }
}
