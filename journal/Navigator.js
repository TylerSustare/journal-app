import React from 'react';
import { StyleSheet, View, TouchableHighlight, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Button, Fab, Icon, Text } from "native-base";
import navStyles from './styles/navStyles';
import Post from './components/posts/Post';
import Posts from './components/posts/Posts';
import NewPost from './components/posts/NewPost';
import UpdatePost from './components/posts/UpdatePost';
import Login from './components/user/Login'
import { compose, graphql } from 'react-apollo';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { signOut } from './loginUtils';
import CreateUser from './components/user/CreateUser';
import LoginUser from './components/user/LoginUser';

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
                <View style={styles.buttonStyle}>
                    <Button iconRight
                        onPress={() => {
                            signOut();
                            this.props.client.resetStore(); // react is re-rendering because of state/props change
                        }}
                    >
                        <Text>Log Out</Text>
                        <Icon name="md-log-out" />
                    </Button>
                </View>
                {/* <Fab style={styles.logOut} */}
                {/* onPress={() => { */}
                {/* signOut(); */}
                {/* this.props.client.resetStore(); // react is re-rendering because of state/props change */}
                {/* }} */}
                {/* position="bottomLeft" */}
                {/* > */}
                {/* <Icon name="md-log-out" /> */}
                {/* </Fab> */}
                <Fab style={styles.newPost} onPress={this.goToNewPost}>
                    <Icon name="md-add" />
                </Fab>
            </View >
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
    },
    buttonStyle: {
        backgroundColor: '#FFF'
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
    },
    UpdatePost: {
        screen: UpdatePost
    },
});

const UserNavigator = createBottomTabNavigator(
    {
        Login: {
            screen: withApollo(LoginUser)
        },
        Create: {
            screen: withApollo(CreateUser)
        }
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: navigation.state.routeName === 'Login' ? <Icon name="md-log-in" /> : <Icon name="md-person-add" />,
            title: navigation.state.routeName,
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
            activeBackgroundColor: "#F5F5F5",
        },
    });

const NavWrapper = (props) => {
    const { loading, user } = props; // loading comes with apollo queries
    if (loading) return <ActivityIndicator size="large" />;
    if (!user) return <UserNavigator />;
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
