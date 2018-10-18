import React, { Component } from 'react'
import { ScrollView, Button, View, StyleSheet } from 'react-native'
import { Form, Item, Input, Label, ScrollableTab } from 'native-base';

export default class PostForm extends Component {
    static defaultProps = {
        post: {}
    };

    state = {
        title: this.props.post.title || '',
        body: this.props.post.body || ''
    };

    submitForm = () => {
        this.props.onSubmit({
            title: this.state.title,
            body: this.state.body
        });
    };

    render() {
        return (
            <ScrollView>
                <Form>
                    <Item floatingLabel>
                        <Label>
                            Title
                        </Label>
                        <Input
                            onChangeText={title => this.setState({ title })}
                            value={this.state.title}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>
                            Body
                        </Label>
                        <Input
                            multiline // behave more like a text area
                            style={styles.body}
                            onChangeText={body => this.setState({ body })}
                            value={this.state.body}
                        />
                    </Item>
                    <Button title="Save Post" onPress={this.submitForm} />
                </Form>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    body: {
        height: 300,
        textAlignVertical: 'top'
    },
});
