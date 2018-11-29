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
  Image
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
        <View style={{flex: 5, width: WIDTH-40,}}>
          <Text style={{
            fontSize: 18,
            letterSpacing: 0.5,
            textAlign: 'center',
            paddingTop: 15,
          }}>
            Economy
          </Text>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center'}}>
              <Image style={{height: 65, width: 65}} source={require('../assets/images/ride-logo.png')} />
            </View>
            <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center'}}>
              <Image style={{height: 65, width: 65}} source={require('../assets/images/ride-logo.png')} />
            </View>
            <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center'}}>
              <Image style={{height: 65, width: 65}} source={require('../assets/images/ride-logo.png')} />
            </View>
          </View>
        </View>
        <View style={{flex: 3, width: WIDTH-30, borderTopWidth: 1, borderColor: '#ededed'}}>
          <View style={{height: 55, justifyContent: 'space-around'}}>
          </View>
          <TouchableOpacity style={{
            height: 50, 
            backgroundColor: 'black', 
            justifyContent: 'space-around', 
            borderRadius: 2
          }}>
            <Text style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
              CONFIRM UBER
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 9,
    position: 'absolute',
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