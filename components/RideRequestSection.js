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
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

function RideOption(props) {
  const text = props.text ? props.text : 'Null'
  const subText = props.subText ? props.subText : 'Null'

  return(
    <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
      <Image style={{height: 65, width: 65}} source={require('../assets/images/ride-logo.png')} />
      <Text style={{color: '#000', fontSize: 18}}>{text}</Text>
      <Text style={{color: '#606060', fontSize: 14, letterSpacing: -0.5}}>{subText}</Text>
    </View>
  )
}

export const RideRequestSection = function(props) {
  const locationCb = props.locationCb ? props.locationCb : () => { console.log('Callback function for current location button not passed to RideRequestSection()') }
  const backCb = props.backCb ? props.backCb : () => { console.log('Callback function for back button not passed to RideRequestSection()') }

  return(
    <View>
      <CurrentLocationButton bottom={400} cb={() => { locationCb() }} />
      <Icon name="md-arrow-back" color="#000000" size={25} style={styles.backIcon}
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
          <Text style={{
            fontSize: 14,
            color: '#606060',
            textAlign: 'center',
          }}>
            Affordable rides, all to yourself
          </Text>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <RideOption text={'$5.48'} subText={'12:48-12:4...'}/>
            <RideOption text={'UberX'} subText={'$7.22'}/>
            <RideOption text={'UberXL'} subText={'$13.44'}/>
          </View>
        </View>
        <View style={{flex: 3, width: WIDTH-30, borderTopWidth: 1, borderColor: '#ededed'}}>
          <View style={{}}>
            <View style={{height: 55, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesomeIcon name="cc-visa" color="#0c0068" size={24} />
                <Text style={{color: '#000', fontSize: 21, fontWeight: 'bold', letterSpacing: -1}}>  {'\u00B7'}{'\u00B7'}{'\u00B7'}{'\u00B7'}</Text>
                <Text style={{color: '#000', fontSize: 14}}> 4242  </Text>
                <Icon name="ios-arrow-down" color="#aaaaaa" size={14} />
              </View>
              <View style={{flexDirection: 'row'}}>
                <MaterialIcon name="person-outline" color="#aaaaaa" size={20} />
                <Text style={{color: '#aaaaaa'}}> 1-2</Text>
              </View>
            </View>
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