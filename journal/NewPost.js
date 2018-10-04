import React, { Component } from 'react'
import { Text, View } from 'react-native'
import navStyles from "./styles/navStyles";

export default class NewPost extends Component {
    static navigationOptions = {
        ...navStyles,
        title: "New Post",
    }

    render() {
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}