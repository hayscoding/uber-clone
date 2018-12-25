import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'firebase'

import * as FirebaseAPI from '../utils/FirebaseAPI'

export default class Loading extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            unsubscribe: undefined,
        }
    }

    componentDidMount() {
        FirebaseAPI.getAuth((user) => {
            this.props.navigation.navigate(user ? 'Main' : 'Login')
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Loading</Text>
                <ActivityIndicator size="large" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})