const clone = require('rfdc')()

const initState = {
  selectedChannel: {
    channelName: "Public",
    _id: "",
    messages: []
  }
}


const reducer = (state = initState, action) => {
  switch (action.type) {
    case ("LOGIN"):
      return {
        ...state,
        ...action.data.login,
      }
    case ("SELECT_CHANNEL"):
      action.channelType === "room" ?
        state.selectedChannel = state.rooms.find(channel => {
          return channel._id === action._id
        }) :
        state.selectedChannel = state.directChannels.find(channel => {
          return channel._id === action._id
        })
      return clone(state)
    case ("NEW_MESSAGE"):
      let updatedChannel = state.directChannels.find(channel => {
        return channel._id === action.message.channelId
      })
      updatedChannel.messages.push(action.message)
      console.log(updatedChannel, state.selectedChannel, updatedChannel._id === state.selectedChannel._id)
      if (updatedChannel._id === state.selectedChannel._id) {
        
        state.selectedChannel.messages.push(action.message)
      }
      return clone(state)
    case ("ADD_CHANNEL"):
      console.log(action)
      const existingChannel = state.directChannels.find(channel => {
        return channel._id === action.directChannel._id
      })
      if (!existingChannel) state.directChannels.push(action.directChannel)
      return clone(state)
    default:
      return state
  }
}

export default reducer