import React from 'react';
import Routes from './routes';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import './styles/main.scss'
import 'antd/dist/antd.css';

const client = new ApolloClient({
  uri: 'https://crdapp.herokuapp.com/v1/graphql'
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