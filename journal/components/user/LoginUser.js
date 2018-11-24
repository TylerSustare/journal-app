import React, { Component } from 'react';
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import * as Sentry from '@sentry/browser';

import UserForm from './UserForm';
import { signIn } from "../../loginUtils";
import navStyles from '../../styles/navStyles';

class LoginUser extends Component {
    state = {
        loading: false
    };
    loginUser = async ({ email, password }) => {
        try {
            const signin = await this.props.signinUser({
                variables: { email, password }
            });
            this.setState({ loading: true })
            signIn(signin.data.signinUser.token); // from the signin user mutation
            this.props.client.resetStore();
        } catch (error) {
            Sentry.captureException(error)
        }
    };

    render() {
        return (
            <View style={styles.container}>
                {this.state.loading
                    ? <ActivityIndicator size="large" />
                    : <UserForm
                        onSubmit={this.loginUser}
                        type="Login"
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

const signinUser = gql`
    mutation signinUser($email: String!, $password: String!){
        signinUser( email: {email: $email password: $password} ) {
            token
        }
    }
`;

export default graphql(signinUser,
    { name: 'signinUser' } // this.props.signinUser 
)(LoginUser);