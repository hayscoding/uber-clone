import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { WebBrowser, MapView } from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { MonoText } from '../components/StyledText';
import { DestinationButton } from '../components/DestinationButton';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

function CurrentLocationButton() {
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
      onPress={() => {}}
    />
    </View>
  )
}

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Icon name="md-menu" color="#000000" size={35} style={styles.menuIcon}
          onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
        />
        <DestinationButton />
        <CurrentLocationButton />
          <MapView
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={styles.map}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  menuIcon: {
    zIndex: 9, 
    position: 'absolute', 
    top: 40, 
    left: 20,
  },
  map: {
    width: WIDTH, 
    height: HEIGHT, 
    zIndex: 0,
  }
});
