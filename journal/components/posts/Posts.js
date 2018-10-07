import React, { Component } from 'react';
import { FlatList, Text, ActivityIndicator } from 'react-native';
import { List, ListItem, Body, Right, Icon } from 'native-base';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Posts extends Component {
    render() {
        const { loading, allPosts, navigation } = this.props;
        if (loading) return <ActivityIndicator size="large" />;
        return (
            <List>
                <FlatList
                    data={allPosts}
                    renderItem={({ item }) => {
                        return ( // gotta remember to return 
                            <ListItem
                                onPress={() => navigation.navigate('Post', {
                                    id: item.id,
                                    title: item.title // just a prop, name doesn't really matter
                                })}
                            >
                                <Body>
                                    <Text>{item.title}</Text>
                                </Body>
                                <Right>
                                    <Icon name="md-arrow-forward" />
                                </Right>
                            </ListItem>
                        );
                    }}
                    keyExtractor={item => item.id}
                />
            </List>
        );
    }
}

const postsQuery = gql`
    query postsQuery {
        allPosts(orderBy: createdAt_DESC) {
            id
            title
        }
    }
`;

export default graphql(postsQuery, {
    props: ({ data }) => ({ ...data })
})(Posts);
