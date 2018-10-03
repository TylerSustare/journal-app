import React, { Component } from 'react';
import { Text, View } from 'react-native';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'

import navStyles from './styles/navStyles';

class Post extends Component {
    static navigationOptions = {
        ...navStyles,
        title: "Post",
    }

    render() {
        const { loading, Post } = this.props;
        if (loading) return null;
        const { id, title } = Post;
        return (
            <View>
                <Text>{id}</Text>
                <Text>{title}</Text>
            </View>
        );
    }
}

const postQuery = gql`
    query Post($id: ID!) {
        Post(id: $id){
            id
            title
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