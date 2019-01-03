import * as React from 'react'
import {
    Text, 
    View, 
    ScrollView,
    TextInput, 
    Button, 
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import {Linking, WebBrowser,} from 'expo'
import firebase from 'firebase/app'
import 'firebase/auth'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import * as FirebaseAPI from '../utils/FirebaseAPI'

const captchaUrl = `https://uber-clone-course.firebaseapp.com/?appurl=`+Linking.makeUrl('')

const WIDTH = Dimensions.get('window').width

export default class VerifyScreen extends React.Component {
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
    }

    onPhoneChange = (phone) => {
        this.setState({phone})
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

        this.navIfSignIn()
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

    navIfSignIn = () => {
        FirebaseAPI.getAuth(user => {
            this.setState({user})

            if(user) {
                FirebaseAPI.storeNewUser(user)
                this.props.navigation.navigate('Main')
            }
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
                                    placeholder={'(201) 555-0123'}
                                    placeholderTextColor={'#a3a3a3'}
                                />
                                <Button
                                    onPress={this.onPhoneComplete}
                                    title="Next"
                                />
                            </View>
                            <TouchableOpacity style={{}}>
                                <MaterialIcon name="my-location" color="#000000" size={25} onPress={() => { cb() }} />
                            </TouchableOpacity>
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

const styles = StyleSheet.create({
    next: {
    zIndex: 9, 
    position: 'absolute', 
    width: 45, 
    height: 45, 
    backgroundColor: '#fff',
    left: WIDTH-70,
    borderRadius: 50,
    shadowColor: '#000000',
    elevation: 7,
    shadowRadius: 5,
    shadowOpacity: 1.0,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
})