import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  InteractionManager,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const WIDTH = Dimensions.get('window').width

export default class DestinationInput extends React.Component {
	state = {
		destination: '',
		depart: '',
	}

	render() {
		const backCb = this.props.backCb ? this.props.backCb : () => { console.log('Callback function for back button not passed to RideRequestSection()') }

	  return (
	    <View style={{
	      zIndex: 9,
	      position: 'absolute',
	      height: 150, 
	      width: WIDTH,
	      backgroundColor: 'white',
	      elevation: 10,
	      padding: 20,
	      flexDirection: 'row',
	    }}>
		    	<View style={{flex: 1}}>
						<Icon name="md-arrow-back" color="#000000" size={25} style={{paddingTop: 20}}
						  onPress={() => { backCb() }}
						/>
			    	<View style={{flex: 1, marginRight: 25, alignItems: 'center'}}>
	      			<Text style={{height: 24, width: 10, fontSize: 28, color: '#a3a3a3',}}>{'\u2022'}</Text>
	      			<View style={{height: 30, borderLeftWidth: 1, borderColor: '#a3a3a3',}}></View>
	      			<Text style={{fontSize: 9}}>{'\u25A0'}</Text>
	        	</View>
	        </View>
	        <View style={{flex: 7, paddingTop: 40}}>
	        	<TextInput style={{height: 33, marginTop: 5, backgroundColor: '#f7f7f7', paddingLeft: 7, fontSize: 18, color: "#4f4f4f"}}
				        onChangeText={(depart) => this.setState({depart})}
				        value={this.state.departAddress}
				        placeholder={'Current Location'}
				        placeholderTextColor={'#595959'}
		        	/>
		        	<TextInput style={{height: 33, marginTop: 10, backgroundColor: '#e2e2e2', paddingLeft: 7, fontSize: 18}}
				        onChangeText={(destination) => this.setState({destination})}
				        value={this.state.destinationAddress}
				        placeholder={'Where to?'}
				        placeholderTextColor={'#a3a3a3'}
		        	/>
	        </View>
	        <View style={{flex: 1,}}>
	        </View>
	    </View>
	  )
	}
}