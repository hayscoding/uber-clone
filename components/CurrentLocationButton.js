import React from 'react';
import {
  View,
  Dimensions,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export const CurrentLocationButton = function(props) {
  const cb = props.cb ? props.cb : console.log('Callback function not passed to CurrentLocationButton()')
  const rideSectionOpen = props.rideSectionOpen ? props.rideSectionOpen : false;

  return(
    <View style={{zIndex: 9, 
      position: 'absolute', 
      width: 45, 
      height: 45, 
      backgroundColor: '#fff',
      top: HEIGHT-140,
      left: WIDTH-70,
      borderRadius: 50,
      shadowColor: '#000000',
      elevation: 7,
      shadowRadius: 5,
      shadowOpacity: 1.0,
      justifyContent: 'space-around',
      alignItems: 'center'
    }}>
	    <MaterialIcon name="my-location" color="#000000" size={25} 
	      style={{
	      }}
	      onPress={() => { cb() }}
	    />
    </View>
  )
}