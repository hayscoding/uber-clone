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

            if(user)
                FirebaseAPI.storeNewUser(user)
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
        return(
            <View style={{flex: 1, backgroundColor: 'red'}}>
                <View style={{flex: 1 /* Change to flex 3 for proper style*/, backgroundColor: '#007bff'}}>
                    <Image 
                        style={{}}
                        source={require('../assets/images/uber_text_logo.png')} 
                    />
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