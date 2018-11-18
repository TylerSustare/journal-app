import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import * as Sentry from '@sentry/browser';

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

class ExampleBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error });
        Sentry.withScope(scope => {
            Object.keys(errorInfo).forEach(key => {
                scope.setExtra(key, errorInfo[key]);
            });
            Sentry.captureException(error);
        });
    }

    render() {
        if (this.state.error) {
            //render fallback UI
            return (
                <a onClick={() => Sentry.showReportDialog()}>Report feedback</a>
            );
        } else {
            //when there's not an error, render children untouched
            return this.props.children;
        }
    }
}

export default class App extends React.Component {

    constructor(props) {
        super(props);
        Sentry.init({
            dsn: "https://b691e4dba7754b38b4c7c5935875a8e0@sentry.io/1325284"
        });
    }

    render() {
        return (
            <ExampleBoundary>
                <ApolloProvider client={client}>
                    <Navigator />
                </ApolloProvider>
            </ExampleBoundary>
        );
    }
}
