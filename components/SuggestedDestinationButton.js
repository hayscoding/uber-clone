import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const WIDTH = Dimensions.get('window').width

export const SuggestedDestinationButton = function(props) {
  const cb = props.cb != undefined ? props.cb : () => { console.log('Callback function not passed to SuggestedDestinationButton()') }

  return(
    <TouchableOpacity style={styles.container} onPress={() => { cb() }}>
      <View style={styles.locationIcon}>
        <MaterialIcon name="location-on" color="gray" size={15} />
      </View>
      <View style={{flex: 5}}>
        <Text style={styles.address}>Suggested Address</Text>
        <Text style={styles.city}>City, State</Text>
      </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {
    zIndex: 9,
    position: 'absolute',
    flexDirection: 'row',
    width: (WIDTH-40), //40 because of left property multiplied by 2 (essentially padding)
    height: 55,
    top: 170,
    left: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000000',
    elevation: 3,
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
  locationIcon: {
    flex: 1, 
    alignItems: 'center',
  },
  address: {
    fontFamily: 'sans-serif', 
    fontSize: 15,
    color: "#545454"
  },
  city: {
    fontFamily: 'sans-serif', 
    fontSize: 13, 
    color: "#9b9b9b"
  }
});
