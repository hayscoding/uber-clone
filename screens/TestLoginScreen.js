import * as React from 'react'
import {
    Text, 
    View, 
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

export default class TestLogin extends React.Component {
    static navigationOptions = {
        headerMode: 'none',
        headerVisible: false,
        header: null,
      };
  
    constructor(props) {
        super(props)
        this.state = {
            user: undefined,
            phone: '',
            confirmationResult: undefined,
            code: ''
        }
        firebase.auth().onAuthStateChanged(user => {
            this.setState({user})
        })
    }

    onPhoneChange = (phone) => {
        this.setState({phone})
    }

    onPhoneComplete = async () => {
        let token = null

        const listener = ({url}) => {
            WebBrowser.dismissBrowser()
        	console.log('listener: ', url)

            const tokenEncoded = Linking.parse(url).queryParams['token']

            if (tokenEncoded){
                token = decodeURIComponent(tokenEncoded)
            }
        }

        Linking.addEventListener('url', listener)
        await WebBrowser.openBrowserAsync(captchaUrl) //open recaptcha screen
        Linking.removeEventListener('url', listener)

        // console.log('token: ', token)

        if (token) {
            FirebaseAPI.signInWithPhoneAndCaptcha(this.state.phone, token, (confirmationResult) => {
                this.setState({confirmationResult})
            })
        }
    }

    onCodeChange = (code) => {
        this.setState({code})
    }

    onSignIn = async () => {
        const {confirmationResult, code} = this.state
        try {
            await confirmationResult.confirm(code)
        } catch (e) {
            console.warn(e)
        }
        this.reset()
    }

    onSignOut = async () => {
        try {
            await firebase.auth().signOut()
        } catch (e) {
            console.warn(e)
        }
    }

    reset = () => {
        this.setState({
            phone: '',
            phoneCompleted: false,
            confirmationResult: undefined,
            code: ''
        })
    }

    render() {
        if (!this.state.confirmationResult)
            return (
                <View style={{flex: 1, backgroundColor: 'red'}}>
                    <View style={{flex: 1 /* Change to flex 3 for proper style*/, backgroundColor: '#007bff'}}>
                        <Image 
                            style={{}}
                            source={require('../assets/images/uber_text_logo.png')} 
                        />
                    </View>
                    <View style={{ flex: 2, backgroundColor: 'white' }}>
                        <Text style={{}}>Get moving with Uber</Text>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={{ flex: 1, paddingLeft: 10 }}>
                                <Text style={{ textAlign: 'center', fontSize: 20 }}>+1</Text>
                            </View>
                            <View style={{ flex: 5, paddingRight: 10 }}>
                                <TextInput 
                                    style={{ textAlign: 'left', fontSize: 20}}
                                    keyboardType="phone-pad"
                                    value={this.state.phone}
                                    onChangeText={this.onPhoneChange}
                                    // maxLength={7}
                                    placeholder={'Enter your mobile number'}
                                    placeholderTextColor={'#a3a3a3'}
                                />
                                <Button
                                    onPress={this.onPhoneComplete}
                                    title="Next"
                                />
                            </View>
                        </View>
                    </View>
                </View>
            )
        else
            return (
                <ScrollView style={{padding: 20, marginTop: 20}}>
                    <TextInput
                        value={this.state.code}
                        onChangeText={this.onCodeChange}
                        keyboardType="numeric"
                        placeholder="Code from SMS"
                    />
                    <Button
                        onPress={this.onSignIn}
                        title="Sign in"
                    />
                </ScrollView>
            )
    }
}