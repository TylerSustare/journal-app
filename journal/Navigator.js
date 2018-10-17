import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, ActivityIndicator, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Fab, Icon } from "native-base";
import navStyles from './styles/navStyles';
import Post from './components/posts/Post';
import Posts from './components/posts/Posts';
import NewPost from './components/posts/NewPost';
import Login from './components/user/Login'
import { compose, graphql } from 'react-apollo';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { signOut } from './loginUtils';

class Home extends React.Component {
    static navigationOptions = {
        ...navStyles,
        title: "Home",
    };

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
                <Button
                    title={'logout'}
                    onPress={() => {
                        signOut();
                        this.props.client.resetStore(); // react is re-rendering because of state/props change
                    }}
                />
                <Fab style={styles.newPost} onPress={this.goToNewPost}>
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
        screen: withApollo(Home) // temporary fix
    },
    Post: {
        screen: Post
    },
    NewPost: {
        screen: NewPost
    }
});

const NavWrapper = (props) => {
    const { loading, user } = props; // loading comes with apollo queries
    if (loading) return <ActivityIndicator size="large" />;
    if (!user) return <Login />;
    return <Navigator screenProps={{ user }} />;
};

const userQuery = gql`
    query userQuery{
        user{ #where the user prop comes from 
            id
            email
            posts(orderBy: createdAt_DESC){
                id
                title
            }
        }
    }
`;

export default graphql(userQuery, {
    props: ({ data }) => ({ ...data })
})(NavWrapper);
