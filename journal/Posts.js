import gql from 'graphql-tag';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { FlatList, Text, View } from 'react-native';

class Posts extends Component {
    render() {
        const { loading, allPosts, navigation } = this.props;
        return (
            <FlatList
                data={allPosts}
                renderItem={({ item }) => {
                    return ( // gotta remember to return 
                        <View>
                            <Text onPress={() => navigation.navigate('Post', {
                                id: item.id,
                                salmon: item.title // just a prop, name doesn't really matter
                            })}>
                                {item.title}
                            </Text>
                        </View>
                    );
                }}
                keyExtractor={item => item.id}
            />
        );
    }
}

const postsQuery = gql`
    {
        allPosts {
            id
            title
        }
    }
`;

export default graphql(postsQuery, {
    props: ({ data }) => ({ ...data })
})(Posts);