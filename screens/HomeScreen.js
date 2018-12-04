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
import { DrawerActions } from 'react-navigation-drawer';
import { WebBrowser, MapView, Constants, Location, Permissions, } from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';

import { MonoText } from '../components/StyledText';
import { DestinationButton } from '../components/DestinationButton';
import { CurrentLocationButton } from '../components/CurrentLocationButton';
import { RideRequestSection } from '../components/RideRequestSection';
import { DestinationInput } from '../components/DestinationInput';
import { SuggestedDestinationButton } from '../components/SuggestedDestinationButton';

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
    requestSectionOpen: false,
    destinationInputOpen: false,
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
        latitudeDelta: 0.045, //Deltas set the zoom of the map on screen
        longitudeDelta: 0.045,
      })
    else
      return null
  }

  toggleComponentOverlay() {
    this.setState({requestSectionOpen: !this.state.requestSectionOpen})
  }

  toggleDestinationInput() {
    this.setState({destInputOpen: !this.state.destInputOpen})
  }

  mainButtons() {
    return(
      <View>
        <Icon name="md-menu" color="#000000" size={32} style={styles.menuIcon}
            onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
          />
        <DestinationButton cb={() => { this.toggleDestinationInput() }}/>
        <SuggestedDestinationButton cb={() => { this.toggleComponentOverlay() }}/>
        <CurrentLocationButton cb={() => { this.setRegionToCurrentLocation() }} />
      </View>
    )
  }

  componentOverlay() {
    if(this.state.requestSectionOpen)
      return <RideRequestSection 
        backCb={() => { this.toggleComponentOverlay() }} 
        locationCb={() => { this.setRegionToCurrentLocation() }} 
      />
    else if(this.state.destInputOpen && !this.state.requestSectionOpen)
      return <DestinationInput />
    else
      return this.mainButtons()
  }

  render() {
    // console.log("HOMESCREEN OUTPUT: \n", 
    //   "LOCATION COORDS: ", this.state.location.coords,
    //   "REGION: ", this.state.region
    // );

    return (
      <View style={styles.container}>
        {this.componentOverlay()}
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
