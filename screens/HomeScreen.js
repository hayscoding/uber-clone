import React from 'react';
import {
  Platform,
  Animated,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Dimensions,
  InteractionManager,
} from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { 
  WebBrowser, 
  MapView, 
  Constants, 
  Location, 
  Permissions,
} from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';

import { MonoText } from '../components/StyledText';
import { DestinationButton } from '../components/DestinationButton';
import { CurrentLocationButton } from '../components/CurrentLocationButton';
import { RideRequestSection } from '../components/RideRequestSection';
import { SuggestedDestinationButton } from '../components/SuggestedDestinationButton';
import DestinationInput from '../components/DestinationInput';

import * as DirectionsAPI from '../utils/DirectionsAPI'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    location: null,
    region: null,
    route: null,
    coordinate: new MapView.AnimatedRegion({
      latitude: 30.3019044,
      longitude: -97.7355154,
    }),
    coordinates: [],
    errorMessage: null,
    requestSectionOpen: false,
    destinationInputOpen: false,
    acc: 0,
  };

  componentDidMount() {
    
  }

  testingComponentDidMount() {
    DirectionsAPI.getSimulatorPolylines((polylines) => {
      console.log('componentDidMount: ', polylines)
    })
  }

  startAnimation() {
    if(this.state.route != null) {
      console.log('STARTANIMATION() ROUTE: ', this.state.route.length, '\nFIRST COORD: ', this.state.route[0])
      this.animateThruCoords(this.state.route)
    }
  }

  animateThruCoords(coords) {
    var nextCoords = coords
    nextCoords = nextCoords.slice(1, nextCoords.length) //remove first elem
    // console.log('COORDS LENGTH: ', coords.length, 'NEXT COORDS LENGTH: ', nextCoords.length)

    if(coords.length != 0)
      this.animate(coords[0], () => { this.animateThruCoords(nextCoords) })
  }

  animate(coord, cb) {
    // console.log('ANIMATE() COORDS:\nlat: ', coord.latitude, '\n: ', coord.longitude)
    // this.state.acc++
    // console.log('ANIMATE CALLED: ', this.state.acc)

    const newCoordinate = {
      latitude: coord.latitude,
      longitude: coord.longitude
    };

    this.state.coordinate.timing(newCoordinate).start(() => { cb() });
  }

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

  setRegionToCurrentLocation() {
    this.setState({region: this.getRegionFromLocation(this.state.location)})
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
      return <DestinationInput 
        backCb={() => { this.toggleDestinationInput() }} 
        coordsCb={(coords) => { this.setState({route: coords}) }}
      />
    else
      return this.mainButtons()
  }

  animatedCarMarker() {
    return(
      <MapView.Marker.Animated
        coordinate={this.state.coordinate}
        anchor={{x: 0.35, y: 0.32}} //centers car.png image
        // ref={marker => { this.marker = marker; }}
        style={{width: 50, height: 50}}
        //rotation={}
        tracksViewChanges={true}
        //animateMarkerToCoordinate={}
      >
        <Image source={require('../assets/images/car.png')}
          style={{ 
            width: 32, 
            height: 32, 
          }}/>
      </MapView.Marker.Animated>
    )
  }

  render() {
    // console.log("HOMESCREEN OUTPUT: \n", 
    //   "LOCATION COORDS: ", this.state.location.coords,
    //   "REGION: ", this.state.region
    // );
    // {
    //   latitude: 30.30225,
    //   longitude: -97.7455,
    //   latitudeDelta: 0.025,
    //   longitudeDelta: 0.025,
    // }

    return (
      <View style={styles.container}>
        {this.componentOverlay()}
        <TouchableOpacity
          onPress={() => this.testingComponentDidMount()}
          style={{zIndex: 9, position: 'absolute', top: 400, width: 50, height: 50, backgroundColor: 'black'}}
        >
          <Text>Animate</Text>
        </TouchableOpacity>
        <MapView
          region={this.state.region}
          showsCompass={false}
          showsUserLocation={true}
          followsUserLocation={true}
          style={styles.map}>
           {(() => {
            if(this.state.route != null)
              return(
                <MapView.Polyline
                  coordinates={this.state.route}
                  strokeWidth={4}
                />
              )
            })()
           }
            {this.animatedCarMarker()}
        </MapView>
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
