import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'

import navStyles from '../../styles/navStyles';

class Post extends Component {
    // static navigationOptions = ({ navigation }) => {
    static navigationOptions = (props) => {
        return {
            ...navStyles,
            title: props.navigation.state.params.title,
        }
    }

    render() {
        const { loading, Post } = this.props;
        if (loading) return <ActivityIndicator size="large" />
        const { title, body } = Post;
        return (
            <View>
                <Text>{title}</Text>
                <Text>{body}</Text>
            </View>
        );
    }
}

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