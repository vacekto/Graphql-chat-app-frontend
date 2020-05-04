

module.exports = {
  fetchLogin: (userName, password) => {
    return fetch(process.env.GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        query{
          login(input:{
            userName:"${userName}"
            password:"${password}"
          }) {
            _id
            userName
            token
            friends
            directChannels{
              channelType
              channelName
              _id
              messages{
                text
                sender
                date
                _id
              }
            }
            rooms{
              _id
              channelName
              channelType
              creator
              messages{
                text
                sender
                date
                _id
              }
            }
            selectedChannel{
              _id
              channelName
              channelType
              messages{
                text
                sender
                date
                _id
              }
            }
          }
        }
      `
      })
    })
  },

  fetchRegister: (userName, password) => {
    return fetch(process.env.GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        mutation{
          register(input:{
            userName:"${userName}"
            password:"${password}"
          }) {
            _id
            userName
            password
          }
        }
      `
      })
    })
  },

  fetchDirectChannel: (searchingUser, searchedUser) => {
    return fetch(process.env.GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query{
          fetchDirectChannel(searchingUser:"${searchingUser}", searchedUser:"${searchedUser}"){
            _id
            members
            channelName
            channelType
            messages{
              _id
              text
              sender
              date
            }
          }
        }
      `
      })
    })
  },
  sendMessage: (senderName, channelId, text, channelType) => {
    return fetch(process.env.GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        mutation{
          sendMessage(input:{
            senderName: "${senderName}"
            channelId:"${channelId}"
            text:"${text}"
            date:"${0}"
            channelType:"${channelType}"
          }){
            _id
            text
            sender
            date
            channelId
            channelType
          }
        }
      `})
    })
  },
  createRoom: (channelName, creator) => {
    return fetch(process.env.GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        mutation{
          createRoom(
            channelName: "${channelName}"
            creator: "${creator}"
          ){
            _id
            channelName
            members
            channelType
            creator
            messages{
              text
              sender
              date
            }
          }
        }
      `})
    })
  },
  leaveRoom: (userName, roomId) => {
    return fetch(process.env.GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        mutation{
          leaveRoom(
            roomId:"${roomId}"
            userName: "${userName}"
          )
        }
      `})
    })
  },
  fetchRoom: (roomId) => {
    return fetch(process.env.GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query{
          fetchRoom(roomId:"${roomId}"){
            _id
            members
            channelName
            channelType
            creator
            messages{
              _id
              text
              sender
              date
            }
          }
        }
      `
      })
    })
  }
}
