import React, { Component } from 'react';
import { Button, View, StyleSheet } from 'react-native';
import CreateUser from './CreateUser';
import LoginUser from './LoginUser';
import { withApollo } from 'react-apollo';

class Login extends Component {
    constructor(params) {
        super(params);
        this.state = {
            register: true,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.register ? (<CreateUser {...this.props} />) : (<LoginUser {...this.props} />)
                }
                <Button
                    onPress={() => this.setState({ register: !this.state.register })}
                    title={this.state.register ? 'Login' : 'Register'}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center' // should put login in center of screen b/c default axis is 'y'
    }
});

export default withApollo(Login); // make the client prop available
