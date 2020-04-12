import React from 'react';
import Routes from './routes';

// import ApolloClient from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { initializeApp } from 'firebase/app';
import { fbConfig } from './libs/firebase';

import 'moment/locale/es'
import './styles/main.scss'
import 'antd/dist/antd.css';

initializeApp(fbConfig);
// const client = new ApolloClient({ uri: 'https://crdapp.herokuapp.com/v1/graphql' });

const wsurl = 'ws://crdapp.herokuapp.com/v1/graphql';
const httpurl = 'https://crdapp.herokuapp.com/v1/graphql';

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
    return (
      kind === 'OperationDefinition' &&
      operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Routes />
      </div>
    </ApolloProvider>
  )
}

export default App;