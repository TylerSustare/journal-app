import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

import Navigator from './Navigator';
import { getToken } from './loginUtils';

// authentication link
const authLink = setContext(async (req, { headers }) => {
    const token = await getToken();
    return {
        ...headers,
        headers: {
            authorization: token ? `Bearer ${token}` : null
        }
    }
});

// connect auth link to http link
const httpLink = new HttpLink({
    uri: 'https://api.graph.cool/simple/v1/cjmsd6ku5avbv0130w7ha43lc'
});
const link = authLink.concat(httpLink);

// connection to graphql API
const client = new ApolloClient({
    link,
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
