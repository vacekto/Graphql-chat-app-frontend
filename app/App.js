import React from "react"
import ReactDOM from "react-dom"
import "./App.scss"
import Login from "./components/Login.js";
import 'bootstrap/dist/css/bootstrap.css';
import Chat from "./components/Chat.js"
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux"
import { Provider } from "react-redux"
import reducer from "./redux/reducer.js"
import ApolloClient from "apollo-client"
import { ApolloProvider } from "react-apollo"
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import thunk from 'redux-thunk';
import test from "./components/inputWithAutocomplete/AddToRoom.js"

const wsurl = "ws://localhost:3001/graphql"
const httpurl = "http://localhost:3001"

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ))
const wsLink = new WebSocketLink({
  uri: wsurl,
  options: {
    reconnect: true
  }
});
const httpLink = new HttpLink({
  uri: httpurl,
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});


class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <BrowserRouter>
            <div className="App">
              <Route path="/" exact component={Login} />
              <Route exact path="/chat" component={Chat} />
              <Route exact path="/test" component={test} />
            </div>
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"))