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
                <View style={{flex: 1, backgroundColor: 'white'}}>
                    <View style={{height: 50, marginTop: 40, marginLeft: 25}}>
                        <MaterialIcon name="arrow-back" color="#000" size={25} onPress={() => { cb() }} />
                    </View>
                    <View style={{ flex: 2, backgroundColor: 'white', justifyContent: 'flex-start'}}>
                        <View style={{height: 100}}>
                            <View style={{flex: 1, paddingLeft: 25, justifyContent: 'flex-start',}}>
                                <Text style={{fontSize: 20, paddingBottom: 10,}}>Enter your mobile number</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                                <Image 
                                    style={{height: 22, width: 35, borderRadius: 3, marginLeft: 25, marginTop: 3}}
                                    source={require('../assets/images/us-flag.jpg')} />
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
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.submit}>
                            <MaterialIcon name="arrow-forward" color="#fff" size={25} onPress={this.onPhoneComplete} />
                        </TouchableOpacity>
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
    submit: {
        alignSelf: 'flex-end',
        width: 60, 
        height: 60, 
        margin: 25,
        backgroundColor: '#000',
        borderRadius: 50,
        shadowColor: '#000000',
        shadowRadius: 5,
        shadowOpacity: 1.0,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
})