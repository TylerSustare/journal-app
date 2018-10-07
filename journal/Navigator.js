import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Fab, Icon } from "native-base";
import navStyles from './styles/navStyles';
import Post from './components/posts/Post';
import Posts from './components/posts/Posts';
import NewPost from './components/posts/NewPost';
import Login from './components/user/Login'

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
                <Fab
                    style={styles.newPost}
                    onPress={this.goToNewPost}
                >
                    <Icon name="md-add" />
                </Fab>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    newPost: {
        backgroundColor: '#82d8d8',
    },
    newPostText: {
        fontSize: 20,
        textAlign: 'center'
    }
});


const Navigator = createStackNavigator({
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

const NavWrapper = (props) => {
    return <Login />;
    return <Navigator />;
}

export default NavWrapper;