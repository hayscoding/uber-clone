import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const WIDTH = Dimensions.get('window').width

export const DestinationButton = function() {
  return(
    <View style={{
      zIndex: 9,
      position: 'absolute',
      flexDirection: 'row',
      width: (WIDTH-40), //40 because of left property multiplied by 2
      height: 60,
      top: 110,
      left: 20,
      borderRadius: 2,
      backgroundColor: 'white',
      alignItems: 'center',
      shadowColor: '#000000',
      elevation: 7,
      shadowRadius: 5,
      shadowOpacity: 1.0
    }}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={{fontSize: 8}}>{'\u25A0'}</Text>
      </View>
      <View style={{flex: 4}}>
        <Text style={{fontFamily: 'sans-serif-thin', fontSize: 21, color: "#545454"}}>Where to?</Text>
      </View>
            
      <View style={{
        flex: 1, 
        borderLeftWidth: 1,
        borderColor: '#ededed'
      }}>
        <Icon name="md-car" color="#000000" size={25} 
          style={{
            alignSelf: 'center',
          }}
        />
      </View>
    </View>
  )
}