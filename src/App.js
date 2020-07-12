import React, { useContext } from 'react';
import Routes from './routes';

// import ApolloClient from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Auth } from './context/AuthContext';

import 'moment/locale/es';
import './styles/main.scss';
import 'antd/dist/antd.css';

export const App = () => {
  const { authState } = useContext(Auth);
  const isIn = authState.status === 'in';
  const headers = isIn ? { Authorization: `Bearer ${authState.token}` } : {};

  const wsurl = 'wss://crdapp.herokuapp.com/v1/graphql';
  const httpurl = 'https://crdapp.herokuapp.com/v1/graphql';

  const wsLink = new WebSocketLink({
    uri: wsurl,
    options: {
      reconnect: true,
      connectionParams: {
        headers,
      },
    },
  });

  const httpLink = new HttpLink({
    uri: httpurl,
    headers,
  });

  const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink
  );

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
};

export default App;
