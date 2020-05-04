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
            dispatch({ type: "SAVE_CHANNEL", channel: res.data.fetchDirectChannel })
          })
      } else dispatch({ type: "NEW_MESSAGE", message })
    } else dispatch({ type: "NEW_MESSAGE", message })
  }
}
