import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import navStyles from '../../styles/navStyles';
import PostForm from './PostForm';
import * as Sentry from '@sentry/browser';

class NewPost extends Component {
    state = {
        loading: false
    };

    static navigationOptions() {
        return {
            ...navStyles,
            title: 'New Post',
        };
    }

    // when making a function like this DO we need to use
    // <PostForm onSubmit={this.newPost.bind(this)} />
    newPost({ title, body }) {
        const { newPost, navigation, screenProps } = this.props;
        this.setState({ loading: true });
        newPost({
            variables: {
                title,
                body,
                userId: screenProps.user.id // userId property comes from graphql(maybe graph cool) not explicitly stated in schema
            }
        }).then(() => {
            navigation.goBack();
        }).catch(error => {
            this.setState({ loading: false });
            Sentry.captureException(e)
        });
    }


    // when using a function like this, we don't have to `.bind(this)` b/c arrow functions
    // we can use it like this <PostForm onSubmit={this.newPost} />
    // newPost = ({ title, body }) => {
    //     console.log(title, body);
    //     this.props.newPost({
    //         variables: {
    //             title,
    //             body
    //         }
    //     }).then(() => { }).catch(error => console.log(error));
    // }

    render() {
        // console.log(this.props.screenProps.user);
        return (
            <View>
                {this.state.loading ? (
                    <ActivityIndicator size="large" />
                ) : (
                        <PostForm onSubmit={this.newPost.bind(this)} />
                    )}
            </View>
        );
    }
}

// name of mutation coming from graph-cool
const newPost = gql`
    mutation newPost($title: String!, $body: String!, $userId: ID!){
        createPost(title: $title, body: $body, userId: $userId){
            id
        }
    }
`;

export default graphql(newPost, {
    name: 'newPost', // name the mutation from here
    options: {
        refetchQueries: ['userQuery']
    }
})(NewPost);
