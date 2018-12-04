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
		destinationAddress: '',
		departAddress: '',
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
	    }}>
	       <Icon name="md-arrow-back" color="#000000" size={25} style={{paddingTop: 20}}
	          onPress={() => { backCb() }}
	        />
	        <View style={{

	        }}>
	        	<TextInput 
		        		style={{height: 40, borderColor: 'gray', borderWidth: 1}}
				        onChangeText={(text) => this.setState({text})}
				        value={this.state.departAddress}
		        	/>
		        	<TextInput 
		        		style={{height: 40, borderColor: 'gray', borderWidth: 1}}
				        onChangeText={(text) => this.setState({text})}
				        value={this.state.destinationAddress}
		        	/>
	        </View>
	    </View>
	  )
	}
}