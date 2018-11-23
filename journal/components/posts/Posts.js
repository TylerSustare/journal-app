import React, { Component } from 'react';
import { ListView } from 'react-native';
import { Container, Content, Body, Button, Icon, List, ListItem, Right, Text } from 'native-base';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import * as Sentry from '@sentry/browser';

class Posts extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            basic: true,
            listViewData: this.props.screenProps.user.posts,
        };
    }
    async deleteRow(secId, rowId, rowMap, id) {
        const { deletePost } = this.props;
        try {
            await deletePost({
                variables: {
                    id
                }
            });
            rowMap[`${secId}${rowId}`].props.closeRow();
            const newData = [...this.state.listViewData];
            newData.splice(rowId, 1);
            this.setState({ listViewData: newData });
        } catch (error) {
            Sentry.captureException(error)
        }
    }
    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const { navigation, screenProps } = this.props;
        return (
            <Container>
                <Content>
                    <List
                        leftOpenValue={75}
                        rightOpenValue={-75}
                        dataSource={this.ds.cloneWithRows(this.props.screenProps.user.posts)}
                        renderRow={data =>
                            (<ListItem
                                onPress={() => navigation.navigate('Post', {
                                    id: data.id,
                                    title: data.title // just a prop, name doesn't really matter
                                })}
                            >
                                <Body>
                                    <Text>{data.title}</Text>
                                </Body>
                                <Right>
                                    <Icon name="md-arrow-forward" />
                                </Right>
                            </ListItem>)}
                        renderLeftHiddenRow={data =>
                            (<Button full onPress={() => alert('Salmon')}>
                                <Icon active name="information-circle" />
                            </Button>)}
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            (<Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap, data.id)}>
                                <Icon active name="trash" />
                            </Button>)}
                    />
                </Content>
            </Container>
        );
    }
}

// name of mutation 'deletePost' coming @ ya from graph-cool
const deletePost = gql`
    mutation deletePost($id: ID!){
        deletePost(id: $id){
            id
        }
    }
`;

export default graphql(deletePost, {
    name: 'deletePost', // name the mutation from here
    options: {
        refetchQueries: ['userQuery']
    }
})(Posts);
