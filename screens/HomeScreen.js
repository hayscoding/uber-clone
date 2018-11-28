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
import { WebBrowser, MapView, Constants, Location, Permissions, } from 'expo';
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

  state = {
    location: null,
    errorMessage: null,
  };


  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    this.setState({ location });
  };

  getCoordsFromLocation() {
    if(this.state.location)
      return({  //Users current position
        latitude: this.state.location.coords.latitude, 
        longitude: this.state.location.coords.longitude,
        latitudeDelta: 0.005, //Deltas set the zoom of the map on screen
        longitudeDelta: 0.005,
      })
    else
      return({  //Default to coordinates of San Francisco
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      })
  }

  render() {

    if(this.state.location)
      console.log("HOMESCREEN OUTPUT: ", this.state.location.coords)

    return (
      <View style={styles.container}>
        <Icon name="md-menu" color="#000000" size={35} style={styles.menuIcon}
          onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
        />
        <DestinationButton />
        <CurrentLocationButton />
          <MapView
            region={this.getCoordsFromLocation()}
            showsCompass={false}
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
