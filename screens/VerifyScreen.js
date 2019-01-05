import * as React from 'react'
import {
    Text, 
    View, 
    ScrollView,
    KeyboardAvoidingView,
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
        if(phone.length == 4) {
            if(!this.hasParentheses(phone))
                var updatedPhone = this.addParentheses(phone)
            else
                var updatedPhone = this.removeParentheses(phone)


            // updatedPhone.splice(3, 0, '-')

            console.log('updatedPhone: ', updatedPhone)
            this.setState({phone: updatedPhone})
        } else if(phone.length == 10) {
            if(!this.hasDash(phone))
                var updatedPhone = this.addDash(phone)
            else
                var updatedPhone = this.removeDash(phone)

            console.log('updatedPhone: ', updatedPhone)
            this.setState({phone: updatedPhone})
        } else
            this.setState({phone: phone})

    }

    hasParentheses = (phone) => {
        return phone.includes('(')
    }

    addParentheses = (phone) => {
        console.log('add parens called')
        var updatedPhone = phone.split('')

        updatedPhone.splice(0, 0, '(')
        updatedPhone.splice(4, 0, ') ')
        updatedPhone = updatedPhone.join('')

        return updatedPhone
    }

    removeParentheses = (phone) => {
        console.log('remove parens called')
        var updatedPhone = phone.split('')

        updatedPhone.splice(0, 1, '')
        updatedPhone.splice(4, 2, '')
        updatedPhone = updatedPhone.join('')

        return updatedPhone
    }

    hasDash = (phone) => {
        return phone.includes('-')
    }

    addDash = (phone) => {
        console.log('add dash called')
        var updatedPhone = phone.split('')

        updatedPhone.splice(9, 0, '-')
        updatedPhone = updatedPhone.join('')

        return updatedPhone
    }

    removeDash = (phone) => {
        console.log('remove dash called')
        var updatedPhone = phone.split('')

        updatedPhone.splice(9, 1, '')
        updatedPhone = updatedPhone.join('')

        return updatedPhone
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

    validatePhone = () => {
        console.log('validatePhone()')
        //Regex validates true for (555) 555-5555 & 1234567890
        if(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(this.state.phone) ) {
            this.onPhoneComplete()
        }
    }

    onPhoneComplete = async () => {
        let token = null
        const phone = '+1 '+this.state.phone
        console.log('onPhoneComplete() phone: ', phone)

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
            FirebaseAPI.signInWithPhoneAndCaptcha(phone, token, (confirmationResult) => {
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
                <KeyboardAvoidingView style={{flex: 1, backgroundColor: 'white'}} behavior="padding" enabled>
                    <View style={{height: 50, marginTop: 40, marginLeft: 25}}>
                        <MaterialIcon name="arrow-back" color="#000" size={25} onPress={() => { this.props.navigation.navigate('Login') }} />
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
                                        keyboardType="number-pad"
                                        value={this.state.phone}
                                        onChangeText={this.onPhoneChange}
                                        maxLength={14}
                                        placeholder={'(201) 555-0123'}
                                        placeholderTextColor={'#a3a3a3'}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.submit}>
                        <MaterialIcon name="arrow-forward" color="#fff" size={25} onPress={() => {this.validatePhone()}} />
                    </TouchableOpacity>
                </KeyboardAvoidingView>
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