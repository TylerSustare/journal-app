import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import PostForm from './PostForm';
import navStyles from '../../styles/navStyles';
import * as Sentry from '@sentry/browser';

class UpdatePost extends Component {
    state = {
        loading: false
    };

    static navigationOptions() {
        return {
            ...navStyles,
            title: 'Update',
        };
    }

    // when making a function like this DO we need to use
    // <PostForm onSubmit={this.updatePost.bind(this)} />
    updatePost({ title, body }) {
        const { updatePost, navigation, screenProps } = this.props;
        this.setState({ loading: true });
        updatePost({
            variables: {
                id: this.props.Post.id, // set from the query since the form doesn't use this
                title, // set from the form
                body, // set from the form
                userId: screenProps.user.id // user.id comes from screen props.
            }
        }).then(() => {
            navigation.goBack();
        }).catch(error => {
            this.setState({ loading: false });
            Sentry.captureException(error)
        });
    }

    render() {
        return (
            <View>
                {this.state.loading ? (
                    <ActivityIndicator size="large" />
                ) : (
                    <PostForm onSubmit={this.updatePost.bind(this)} post={this.props.Post} />
                )}
            </View>
        );
    }
}

// name of mutation coming from graph-cool
const updatePost = gql`
    mutation updatePost($id: ID!, $title: String!, $body: String!, $userId: ID!){
        updatePost(id: $id, title: $title, body: $body, userId: $userId){
            id
        }
    }
`;

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

export default compose(
    graphql(updatePost, {
        name: 'updatePost', // name the mutation from here
        options: {
            refetchQueries: ['Post'] // from Post.js
        }
    }),
    graphql(postQuery, {
        props: ({ data }) => ({ ...data }),
        options: ({ navigation }) => ({
            variables: {
                id: navigation.state.params.id // props from the navigation to this page
            }
        })
    })
)(UpdatePost);
