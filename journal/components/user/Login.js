import React, { Component } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import CreateUser from './CreateUser';
import LoginUser from './LoginUser';

export default class Login extends Component {
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
                    this.state.register ? (
                        <CreateUser />
                    ) : (
                            <LoginUser />
                        )
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
