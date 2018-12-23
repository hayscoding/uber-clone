import React from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Animated,
  Image,
  TextInput,
  Text,
} from 'react-native'
import { DrawerItems, SafeAreaView } from 'react-navigation';

import * as FirebaseAPI from '../utils/FirebaseAPI'

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    headerMode: 'none',
    headerVisible: false,
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      phone: null,
      navigation: this.props.navigation,
    }
  }

  componentWillMount() {
    // FirebaseAPI.setInvisibleRecaptcha()
  }

  verifyNumber(e) {
    e.preventDefault();

    console.log('verifying phone number...')

    this.state.navigation.navigate('Main')
    // FirebaseAPI.signInWithPhoneNumber()
  }

  render() {
    return (
      <View style={styles.container}>
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
                keyboardType="number-pad"
                onChangeText={(num) => this.setState({phone: num})}
                onSubmitEditing={this.verifyNumber.bind(this)}
                value={this.state.num}
                maxLength={7}
                placeholder={'Enter your mobile number'}
                placeholderTextColor={'#a3a3a3'}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});
