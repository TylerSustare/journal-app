import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import gql from 'graphql-tag';
import { Fab, Icon } from "native-base";
import { graphql } from 'react-apollo'

import navStyles from '../../styles/navStyles';

class Post extends Component {
    // static navigationOptions = ({ navigation }) => {
    static navigationOptions = (props) => {
        return {
            ...navStyles,
            title: props.navigation.state.params.title,
        }
    };

    updatePost = () => {
        const { Post } = this.props;
        this.props.navigation.navigate('UpdatePost', {
            id: Post.id,
            title: Post.title,
            body: Post.body
        });
    };

    render() {
        const { loading, Post } = this.props;
        if (loading) return <ActivityIndicator size="large" />
        const { title, body } = Post;
        return (
            <View style={styles.container}>
                <Fab style={styles.newPost} onPress={this.updatePost}>
                    <Icon name="md-create" />
                </Fab>
                <Text style={styles.bodyText}>{body}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1 // container to be height of whole page
    },
    bodyText: {
        fontSize: 16
    },
    newPost: {
        backgroundColor: '#82d8d8',
    },
});

// TODO: refactor this query to live somewhere else for re-use in Post.js and UpdatePost.js
const postQuery = gql`
    query Post($id: ID!) {
        Post(id: $id){
            id
            title
            body
        }
    }
`;

export default graphql(postQuery, {
    props: ({ data }) => ({ ...data }),
    options: ({ navigation }) => ({
        variables: {
            id: navigation.state.params.id // props from the navigation to this page
        }
    })
})(Post);