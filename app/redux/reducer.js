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
      const channelType = action.message.channelType + "s"
      const updatedChannel = state[channelType].find(channel => {
        return channel._id === action.message.channelId
      })
      updatedChannel.messages.push(action.message)
      if (updatedChannel._id === state.selectedChannel._id) {
        state.selectedChannel.messages.push(action.message)
      }
      return clone(state)
    case ("SAVE_CHANNEL"):
      console.log(action)
      const existingChannel = state[action.channel.channelType + "s"].find(channel => {
        return channel._id === action.channel._id
      })
      if (!existingChannel) state[action.channel.channelType + "s"].push(action.channel)
      return clone(state)
    case ("LEAVE_ROOM"):
      state.rooms = state.rooms.filter(room => room._id !== action.roomId)
      state.selectedChannel = state.rooms.find(room => room.channelName === "Public")
      return clone(state)
    default:
      return state
  }
}

export default reducer