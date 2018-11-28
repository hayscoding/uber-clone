import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  InteractionManager,
} from 'react-native';
import { CurrentLocationButton } from '../components/CurrentLocationButton';
import Icon from 'react-native-vector-icons/Ionicons';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export const RideRequestSection = function(props) {
  const locationCb = props.locationCb ? props.locationCb : console.log('Callback function for current location button not passed to RideRequestSection()')
  const backCb = props.backCb ? props.backCb : console.log('Callback function for back button not passed to RideRequestSection()')

  return(
    <View>
      <CurrentLocationButton bottom={400} cb={() => { locationCb() }} />
      <Icon name="md-arrow-back" color="#000000" size={35} style={styles.backIcon}
            onPress={() => { backCb() }}
          />
      <View style={styles.container}>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 9,
    position: 'absolute',
    flexDirection: 'row',
    width: WIDTH,
    height: 340,
    top: HEIGHT-340,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000000',
    elevation: 3,
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
  backIcon: {
    zIndex: 9, 
    position: 'absolute', 
    top: 40, 
    left: 20,
  },
});