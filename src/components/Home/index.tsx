import { Text, StyleSheet, View } from 'react-native';
import React, {Component} from 'react';

import {observer} from 'mobx-react';
import store from './store';

interface Props {
    store: store;
}

@observer
class Home extends Component<Props, {}> {
    render() {
        return (
            <View
                style={[styles.container, { paddingBottom: 60 }]}
                testID="test"
            >
                <Text
                    onPress={this.props.store.changeText}
                >{this.props.store.text}</Text>
            </View>
        );
    }

    componentDidMount() {
        this.props.store.sayHello();
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    }
});

export default (props) => <Home store={new store()} {...props} />
