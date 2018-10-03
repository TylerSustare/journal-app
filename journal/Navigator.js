import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import navStyles from './styles/navStyles';
import Post from './Post';
import Posts from './Posts';

class Home extends React.Component {
    static navigationOptions = {
        ...navStyles,
        title: "Home",
    }
    goToPost = () => {
        this.props.navigation.navigate('Post');
    };

    render() {
        return (
            <View style={styles.container}>
                <Posts {...this.props} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {}
});


export default createStackNavigator({
    // loads first screen first
    Home: {
        screen: Home
    },
    Post: {
        screen: Post
    }
});