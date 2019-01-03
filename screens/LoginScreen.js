import * as React from 'react'
import {
    Text, 
    View,
    TouchableOpacity,
    ScrollView,
    TextInput, 
    Button, 
    Image,
} from 'react-native'
import {Linking, WebBrowser,} from 'expo'
import firebase from 'firebase/app'
import 'firebase/auth'

import * as FirebaseAPI from '../utils/FirebaseAPI'

const captchaUrl = `https://uber-clone-course.firebaseapp.com/?appurl=`+Linking.makeUrl('')

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        headerMode: 'none',
        headerVisible: false,
        header: null,
      };

    constructor(props) {
        super(props)
    }

    render() {
        return(
            <View style={{flex: 1, backgroundColor: 'red'}}>
                <View style={{flex: 3, backgroundColor: '#007bff', justifyContent: 'center', alignItems: 'center'}}>
                    <Image 
                        style={{height: 100, width: 100, backgroundColor: 'white'}}
                        source={require('../assets/images/uber_text_logo.png')} />
                </View>
                <View style={{ flex: 2, backgroundColor: 'white' }}>
                    <Text style={{}}>Get moving with Uber</Text>
                    <TouchableOpacity
                        style={{flex: 1}}
                        onPress={() => {this.props.navigation.navigate('Verify')}}
                    >
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={{ flex: 1, paddingLeft: 10 }}>
                                <Text style={{ textAlign: 'center', fontSize: 20 }}>+1</Text>
                            </View>
                            <View style={{ flex: 5, paddingRight: 10 }}>
                                <Text style={{ textAlign: 'left', fontSize: 20, color: '#a3a3a3'}}>Enter your mobile number</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}