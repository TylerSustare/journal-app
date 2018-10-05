import gql from 'graphql-tag';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { FlatList, Text, View, ActivityIndicator } from 'react-native';

class Posts extends Component {
    render() {
        const { loading, allPosts, navigation } = this.props;
        if (loading) return <ActivityIndicator size="large" />;
        return (
            <FlatList
                data={allPosts}
                renderItem={({ item }) => {
                    return ( // gotta remember to return 
                        <View>
                            <Text
                                onPress={() => navigation.navigate('Post', {
                                    id: item.id,
                                    title: item.title // just a prop, name doesn't really matter
                                })}
                            >
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
    query postsQuery {
        allPosts {
            id
            title
        }
    }
`;

export default graphql(postsQuery, {
    props: ({ data }) => ({ ...data })
})(Posts);
