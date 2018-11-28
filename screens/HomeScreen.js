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
  InteractionManager,
} from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { WebBrowser, MapView, Constants, Location, Permissions, } from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';

import { MonoText } from '../components/StyledText';
import { DestinationButton } from '../components/DestinationButton';
import { CurrentLocationButton } from '../components/CurrentLocationButton';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    location: null,
    region: null,
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

    this.setState({location: location,  region: this.getRegionFromLocation(location)});
  };

  setRegionToCurrentLocation() {
    this.setState({region: this.getRegionFromLocation(this.state.location)})
  }

  getRegionFromLocation(location) {
    if(location)
      return({  //Users current position
        latitude: location.coords.latitude, 
        longitude: location.coords.longitude,
        latitudeDelta: 0.012, //Deltas set the zoom of the map on screen
        longitudeDelta: 0.012,
      })
    else
      return null
  }

  render() {

    if(this.state.location)
      console.log("HOMESCREEN OUTPUT: \n", 
        "LOCATION COORDS: ", this.state.location.coords,
        "REGION: ", this.state.region)

    return (
      <View style={styles.container}>
        <Icon name="md-menu" color="#000000" size={35} style={styles.menuIcon}
          onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
        />
        <DestinationButton />
        <CurrentLocationButton cb={() => { this.setRegionToCurrentLocation() }} />
        <MapView
          region={this.state.region}
          showsCompass={false}
          showsUserLocation={true}
          followsUserLocation={true}
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
