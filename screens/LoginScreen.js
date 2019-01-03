import * as React from 'react'
import {
    Text, 
    View,
    TouchableOpacity,
    ScrollView,
    TextInput, 
    Dimensions,
    Button, 
    Image,
} from 'react-native'
import { Linking, WebBrowser } from 'expo'
import firebase from 'firebase/app'
import 'firebase/auth'

import * as FirebaseAPI from '../utils/FirebaseAPI'

const captchaUrl = `https://uber-clone-course.firebaseapp.com/?appurl=`+Linking.makeUrl('')

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

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
                <View style={{flex: 3, backgroundColor: '#007bff', justifyContent: 'center', alignItems: 'center', }}>
                    <View style={{padding: 20, backgroundColor: 'white'}}>
                        <Image 
                            style={{height: 75, width: 75}}
                            source={require('../assets/images/uber_text_logo.png')} />
                    </View>
                    {/*Winky face to indicate that this is an Uber Clone ;)*/}
                    <Text style={{position: 'absolute', top: HEIGHT/3+60, left: WIDTH/2-30, fontSize: 50, textAlign: 'center', marginBottom: 20}}>{'\uD83D\uDE0E'}</Text>
                </View>
                <View style={{ flex: 2, backgroundColor: 'white', justifyContent: 'space-around'}}>
                    <View style={{flex: 1, paddingLeft: 25, justifyContent: 'flex-end',}}>
                        <Text style={{fontFamily: 'sans-serif-thin', fontSize: 30, }}>Get moving with Uber</Text>
                    </View>
                    <View style={{flex: 1,}}>
                        <TouchableOpacity
                            style={{flex: 1, flexDirection: 'row',}}
                            onPress={() => {this.props.navigation.navigate('Verify')}} >
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                  <Image 
                                    style={{height: 22, width: 35, borderRadius: 3, marginLeft: 25, marginTop: 3}}
                                    source={require('../assets/images/us-flag.jpg')} />
                                <View style={{ flex: 1, paddingLeft: 4 }}>
                                    <Text style={{ textAlign: 'center', fontSize: 20 }}>+1</Text>
                                </View>
                                <View style={{ flex: 5, paddingRight: 10 }}>
                                    <Text style={{ textAlign: 'left', fontSize: 20, color: '#a3a3a3'}}>Enter your mobile number</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, borderTopWidth: 1, borderTopColor: 'lightgray', justifyContent: 'center'}}>   
                        <Text style={{ textAlign: 'left', fontSize: 15, color: '#a3a3a3', textAlign: 'center'}}>Get the Uber Clone Course at haysstanford.com</Text>
                    </View>
                </View>
            </View>
        )
    }
}