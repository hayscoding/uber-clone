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

  constructor(props) {
    super(props);

    this.state = {
      location: null,
      region: {
        latitude: 30.29877,
        longitude: -97.74719,
        latitudeDelta: 0.045,
        longitudeDelta: 0.045,
      },
      route: null,
      coordinate: new MapView.AnimatedRegion({
        latitude: 30.3019044,
        longitude: -97.7355154,
      }),
      markerCoordinates: null,
      markerBearings: [],
      polylines: [],
      errorMessage: null,
      requestSectionOpen: false,
      destinationInputOpen: false,
      animating: false,
    };
  }

  componentDidMount() {
    DirectionsAPI.getSimulatorPolylines((polylines) => {
      this.setState({polylines: polylines, markerCoordinates: this.getCoordinateFromPolylines(polylines), markerBearings: this.getInitBearings(polylines)})
    })
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

  getInitBearings(polylines) {
    const bearings = []

    for(var i = 0; i < polylines.length; i++)
      bearings.push('90deg')

    return bearings
  }

  //Iterates through all polylines & returns an array of the 1st coordinate for each polyline
  getCoordinateFromPolylines(polylines) {
    var coordinates = []

    polylines.forEach((polyline) => {
      coordinates.push(new MapView.AnimatedRegion({
        latitude: polyline[0].latitude,
        longitude: polyline[0].longitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.045,
      }))
    })

    // console.log('setCoords return: ', coordinates)
    return coordinates
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

  animateMarkersThruCoords() {
    for(var i = 0; i < this.state.polylines.length; i++) {
      this.animateMarkerThruCoords(i, this.state.polylines[i])
    }
  }

  animateMarkerThruCoords(index, coords) {
    // console.log('INDEX: ', index)
    // var nextCoords = coords
    // nextCoords = nextCoords.slice(1, nextCoords.length) //remove first elem
    // console.log('ANIMATE MARKER THRU() COORDS: ', index, coords, '\nNextCoords: ', coords.slice(1, coords.length)) //remove first elem)

    // if(coords.length != 0)
    // console.log('Coords: ', coords)
    if(coords.length != 0){
      this.updateMarkerBearing(index, this.getBearing(coords[0], coords[1]))

      this.animateMarker(index, coords[0], () => {/* this.animateMarkerThruCoords(index, coords.slice(1, coords.length)) */})
    }
    else 
      this.animateMarkerThruCoords(index, this.state.polylines[index])
  }

  animateMarker(index, coord, cb) {
    // console.log('animateMarker', coord)
    const nextCoord = {
      latitude: coord.latitude,
      longitude: coord.longitude
    };

    this.state.markerCoordinates[index].timing(nextCoord).start(() => { cb() });
  }

  startMarkerAnimation() {
    // console.log('START MARKER ANIMATIONS(): ', index, route)
    if(!this.state.animating){
      this.animateMarkersThruCoords()
      this.setState({animating: true})
    }
  }

  animateThruCoords(coords) {
    var nextCoords = coords
    nextCoords = nextCoords.slice(1, nextCoords.length) //remove first elem
    // console.log('COORDS LENGTH: ', coords.length, 'NEXT COORDS LENGTH: ', nextCoords.length)

    if(coords.length != 0)
      this.animate(coords[0], () => { this.animateThruCoords(nextCoords) })
  }

  startAnimation() {
    if(this.state.route != null) {
      console.log('STARTANIMATION() ROUTE: ', this.state.route.length, '\nFIRST COORD: ', this.state.route[0])
      this.animateThruCoords(0, this.state.route)
    }
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

  updateMarkerBearing(index, bearing) {
    console.log('updateMarkerBearing: ', index, this.state.markerBearings[index])
    // if( == undefined)
    // this.setState({markerBearings: {index: index, bearing: bearing}})
  }

  getBearing(fromCoord, toCoord) {
    function toDegrees (radians) {
      return radians * (180 / Math.PI);
    }

    // console.log('getMarkerBearing:\nfromCoord: ', fromCoord, '\ntoCoord: ', toCoord)
    const λ1 = fromCoord.latitude
    const φ1 = fromCoord.longitude
    const λ2 = toCoord.latitude
    const φ2 = toCoord.longitude

    var y = Math.sin(λ2-λ1) * Math.cos(φ2);
    var x = Math.cos(φ1)*Math.sin(φ2) -
            Math.sin(φ1)*Math.cos(φ2)*Math.cos(λ2-λ1);
    var bearing = toDegrees(Math.atan2(y, x));

    // console.log('Math.sin:', Math.sin(λ2-λ1))
    // console.log('λ1: ', λ1, 'φ1: ', φ1, '\nλ2: ', λ2, 'φ2: ', φ2, '\nx: ', x, 'y: ', y, '\nBearing: ', bearing)
    // console.log('Bearing: ', bearing)
    return bearing
  }

  animatedMarker(index) {
    // console.log('animatedCarMarker(): ', this.state.markerCoordinates)
    if(this.state.markerCoordinates != null)
      return(
        <MapView.Marker.Animated
          coordinate={this.state.markerCoordinates[index]}
          anchor={{x: 0.35, y: 0.32}} //centers car.png image
          // ref={marker => { this.marker = marker; }}
          style={{width: 50, height: 50, transform: [{rotate: '-57deg'}]}}
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

  // animatedCarMarker() {
  //   return(
  //     <MapView.Marker.Animated
  //       coordinate={this.state.coordinate}
  //       anchor={{x: 0.35, y: 0.32}} //centers car.png image
  //       // ref={marker => { this.marker = marker; }}
  //       style={{width: 50, height: 50}}
  //       //rotation={}
  //       tracksViewChanges={true}
  //       //animateMarkerToCoordinate={}
  //     >
  //       <Image source={require('../assets/images/car.png')}
  //         style={{ 
  //           width: 32, 
  //           height: 32, 
  //         }}/>
  //     </MapView.Marker.Animated>
  //   )
  // }

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
    // console.log('render() markerCoordinates: ', this.state.markerCoordinates)

    return (
      <View style={styles.container}>
        {this.componentOverlay()}
        <TouchableOpacity
          onPress={() => this.startMarkerAnimation()}
          style={{zIndex: 9, position: 'absolute', top: 400, width: 50, height: 50, backgroundColor: 'black'}}
        >
          <Text>Animate</Text>
        </TouchableOpacity>
        <MapView
          region={this.state.region}
          showsCompass={false}
          showsUserLocation={true}
          followsUserLocation={true}
          ref={(map) => {this.map = map}}
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
            {this.animatedMarker(0)}
            {this.animatedMarker(1)}
            {this.animatedMarker(2)}
            {this.animatedMarker(3)}
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
