import React, { Component } from 'react';
import { ListView } from 'react-native';
import { Container, Content, Body, Button, Icon, List, ListItem, Right, Text } from 'native-base';
import * as Sentry from '@sentry/browser';

export default class SwipeableListExample extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            basic: true,
            listViewData: this.props.screenProps.user.posts,
        };
    }
    deleteRow(secId, rowId, rowMap) {
        try {
            rowMap[`${secId}${rowId}`].props.closeRow();
            const newData = [...this.state.listViewData];
            newData.splice(rowId, 1);
            this.setState({ listViewData: newData });
        } catch (e) {
            Sentry.captureException(e);
        }
    }
    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const { navigation, screenProps } = this.props;
        // console.log(this.props.screenProps.user.posts);
        return (
            <Container>
                <Content>
                    <List
                        leftOpenValue={75}
                        rightOpenValue={-75}
                        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
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
                            (<Button full onPress={() => alert(data.title.length)}>
                                <Icon active name="information-circle" />
                            </Button>)}
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            (<Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                                <Icon active name="trash" />
                            </Button>)}
                    />
                </Content>
            </Container>
        );
    }
}
