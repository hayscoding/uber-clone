import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native'

import * as FirebaseAPI from '../utils/FirebaseAPI'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  signOut() {
  	FirebaseAPI.signOut(() => {
      this.props.navigation.navigate('Login')
    })
  }

  render() {
    return (
    	<View style={{flex: 1}}>
    		<TouchableOpacity
    			style={{flex: 1, borderTopWidth: 1, borderColor: 'lightgray'}}
    			onPress={() => { this.signOut() }}
    		>
    			<Text style={{fontSize: 17,  padding: 15, textAlign: 'left',}}>
    				Sign Out
  				</Text>
    		</TouchableOpacity>
    	</View>
	)
  }
}
