import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

import UserForm from './UserForm';
import { signIn } from "../../loginUtils";

class LoginUser extends Component {
    loginUser = async ({ email, password }) => {
        try {
            const signin = await this.props.signinUser({
                variables: { email, password }
            });
            signIn(signin.data.signinUser.token); // from the signin user mutation
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <View>
                <Text>Login</Text>
                <UserForm
                    onSubmit={this.loginUser}
                    type="Login"
                />
            </View>
        );
    }
}

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