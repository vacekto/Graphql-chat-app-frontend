import gql from "graphql-tag"
import { Subscription } from "react-apollo"

const COMMENTS_SUBSCRIPTION = gql`
subscription{
  newChannelMessage(channelId:"5e9e30e6da3f0003fc7d3093"){
    text
    sender
    _id
  }
}
`;


subscribeToMessages: () => (
  <Subscription
    subscription={COMMENTS_SUBSCRIPTION}
    variables={{ repoFullName }}
  >
    {({ data: { commentAdded }, loading }) => (
      <h4>New comment: {!loading && commentAdded.content}</h4>
    )}
  </Subscription>
)
