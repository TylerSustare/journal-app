import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import * as Sentry from '@sentry/browser';

import UserForm from './UserForm';
import { signIn } from "../../loginUtils";

class CreateUser extends Component {
    state = {
        loading: false
    };

    createUser = async ({ email, password }) => {
        try {
            const user = await this.props.createUser({
                variables: { email, password }
            });
            const signin = await this.props.signinUser({
                variables: { email, password }
            });
            this.setState({ loading: true })
            signIn(signin.data.signinUser.token); // from the signin user mutation
            this.props.client.resetStore() // from using withApollo in the parent
        } catch (error) {
            if (error.graphQLErrors[0].message === 'User already exists with that information') {
                alert('Error creating account.')
            } else {
                alert('Error signing up.\n The developer has been notified');
                Sentry.captureException(error);
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.loading
                    ? <ActivityIndicator />
                    :
                    <UserForm
                        onSubmit={this.createUser}
                        type="Create Account"
                    />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100
    }
});

const createUser = gql`
    mutation createUser($email: String!, $password: String!){
        createUser(
            authProvider: {
                email: {
                    email: $email
                    password: $password
                }
            }
        ) {
            id # what we want returned
        }
    }
`;

const signinUser = gql`
    mutation signinUser($email: String!, $password: String!){
        signinUser( email: {email: $email password: $password} ) {
            token
        }
    }
`;

export default compose(
    graphql(signinUser, { name: 'signinUser' }), // this.props.signinUser
    graphql(createUser, { name: 'createUser' }),
)(CreateUser);