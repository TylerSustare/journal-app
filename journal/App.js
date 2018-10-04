import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import Navigator from './Navigator';

// connection to graphql API
const client = new ApolloClient({
    link: new HttpLink({
        uri: 'https://api.graph.cool/simple/v1/cjmsd6ku5avbv0130w7ha43lc'
    }),
    cache: new InMemoryCache()
});

export default class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Navigator />
            </ApolloProvider>
        );
    }
}
