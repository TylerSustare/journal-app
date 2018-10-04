import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import navStyles from './styles/navStyles';
import Post from './Post';
import Posts from './Posts';
import NewPost from './NewPost';

class Home extends React.Component {
    static navigationOptions = {
        ...navStyles,
        title: "Home",
    }

    goToPost = () => {
        this.props.navigation.navigate('Post');
    };

    goToNewPost = () => {
        this.props.navigation.navigate('NewPost');
    };

    render() {
        return (
            <View style={styles.container}>
                <Posts {...this.props} />
                <TouchableHighlight onPress={this.goToNewPost} style={styles.newPost}>
                    <Text style={styles.newPostText}> New Post +</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'space-between'
    },
    newPost: {
        backgroundColor: '#82d8d8',
        padding: 20
    },
    newPostText: {
        fontSize: 20,
        textAlign: 'center'
    }
});


export default createStackNavigator({
    // loads first screen first
    Home: {
        screen: Home
    },
    Post: {
        screen: Post
    },
    NewPost: {
        screen: NewPost
    }
});