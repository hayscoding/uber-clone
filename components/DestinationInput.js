import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  InteractionManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const WIDTH = Dimensions.get('window').width

export const DestinationInput = function(props) {
  const backCb = props.backCb ? props.backCb : () => { console.log('Callback function for back button not passed to DestinationInput()') }

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
        </View>
    </View>
  )
}