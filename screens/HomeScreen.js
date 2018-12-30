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
import firebase from 'firebase'

import { MonoText } from '../components/StyledText';
import { DestinationButton } from '../components/DestinationButton';
import { CurrentLocationButton } from '../components/CurrentLocationButton';
import { RideRequestSection } from '../components/RideRequestSection';
import { SuggestedDestinationButton } from '../components/SuggestedDestinationButton';
import { HomeScreenButtons } from '../components/HomeScreenButtons'
import DestinationInput from '../components/DestinationInput';

import * as DirectionsAPI from '../utils/DirectionsAPI'
import * as FirebaseAPI from '../utils/FirebaseAPI'
import * as GeoFireAPI from '../utils/GeoFireAPI'

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
            markers: undefined,
            testMarkers: [],
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

    /*
    ###########################################
    Lifecycle Functions
    ###########################################
    */

    componentDidMount() {

    }

    componentDidUpdate() {
        console.log('CompnentDidUpdate: ', this.state.testMarkers)
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

    render() {
        return (
            <View style={styles.container}>
                {this.componentOverlay()}
                <TouchableOpacity
                    onPress={() => this.test()/*this.startMarkerAnimation()*/}
                    style={{
                        zIndex: 9, 
                        position: 'absolute', 
                        top: 400, 
                        width: 50, 
                        height: 50, 
                        backgroundColor: 'black'}} >
                    <Text>Animate</Text>
                </TouchableOpacity>
                <MapView
                    initialRegion={this.state.region}
                    showsCompass={false}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    ref={(map) => {this.map = map}}
                    style={styles.map} >
                    { this.showDrivers() }
                    {
                        (() => {
                            if(this.state.route != null)
                                return (
                                    <MapView.Polyline
                                        coordinates={this.state.route}
                                        strokeWidth={4}/>
                                )
                        })()
                    }
                     {
                    this.driver({
                        location: {
                            latitude: 30.30032,
                            longitude: -97.73968
                        }
                    })
                }
                </MapView>
            </View>
        );
    }

    /*
    ###########################################
    General Functions
    ###########################################
    */

    setRegionToCurrentLocation() {
        this.setState({region: this.getRegionFromLocation(this.state.location)})
    }

    toggleComponentOverlay() {
        this.setState({requestSectionOpen: !this.state.requestSectionOpen})
    }

    toggleDestinationInput() {
        this.setState({destInputOpen: !this.state.destInputOpen})
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

    componentOverlay() {
        if(this.state.requestSectionOpen)
            return <RideRequestSection 
                backCb={() => { this.toggleComponentOverlay() }} 
                locationCb={() => { this.setRegionToCurrentLocation() }} />
        else if(this.state.destInputOpen && !this.state.requestSectionOpen)
            return <DestinationInput 
                backCb={() => { this.toggleDestinationInput() }} 
                coordsCb={(coords) => { this.setState({route: coords}) }} />
        else
            return <HomeScreenButtons 
                navigation={this.props.navigation}
                toggleDestinationInput={() => { this.toggleDestinationInput() }}
                toggleComponentOverlay={() => { this.toggleComponentOverlay() }}
                setRegionToCurrentLocation={() => { this.setRegionToCurrentLocation() }} />
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


    test() {
        console.log('test pressed')
        GeoFireAPI.watchLocation(firebase.auth().currentUser.uid)

        GeoFireAPI.getGeoQuery(firebase.auth().currentUser.uid, (geoQuery) => {
            this.setGeoQueryEvents(geoQuery)
        })
    }

    driver(driver) {
        console.log('animatedDriver(): ', driver)
        // console.log('markerBearing: ', this.state.markerBearings[index])
        return(
            <MapView.Marker.Animated
                coordinate={driver.location}
                anchor={{x: 0.35, y: 0.32}} //centers car.png image
                // ref={marker => { this.marker = marker; }}
                style={{width: 50, height: 50, /*transform: [{rotate: this.state.markerBearings[index]}]*/}}
                // tracksViewChanges={true}
                //animateMarkerToCoordinate={}
            >
                <Image 
                    source={require('../assets/images/car.png')}
                    style={{ 
                        width: 32, 
                        height: 32, 
                    }}
                />
            </MapView.Marker.Animated>
        )
    }

    showDrivers() {
        return this.state.testMarkers.map((driver) => {
            return this.animatedDriver(driver)
        })
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


/*

 getInitBearings(polylines) {
    const bearings = []

    for(var i = 0; i < polylines.length; i++)
      bearings.push('90deg')

    return bearings
  }



  animatedMarker(index) {
    // console.log('animatedCarMarker(): ', this.state.markerCoordinates)
    // console.log('markerBearing: ', this.state.markerBearings[index])
    if(this.state.markerCoordinates != null && this.state.markerBearings[index] != undefined)
      return(
        <MapView.Marker.Animated
          coordinate={this.state.markerCoordinates[index]}
          anchor={{x: 0.35, y: 0.32}} //centers car.png image
          // ref={marker => { this.marker = marker; }}
          style={{width: 50, height: 50, transform: [{rotate: this.state.markerBearings[index]}]}}
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

      this.animateMarker(index, coords[0], () => { this.animateMarkerThruCoords(index, coords.slice(1, coords.length)) })
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

  updateMarkerBearing(index, bearing) {
    // console.log('updateMarkerBearing: ', index, this.state.markerBearings[index])

    var _bearings = [...this.state.markerBearings] //make separate copy of Array due to JS referencing
    const bearingStr = bearing+'deg'

    _bearings.splice(index, 1, bearingStr)

    this.setState({markerBearings: _bearings})
  }

  getBearing(fromCoord, toCoord) {
    function toDegrees (radians) {
      return radians * (180 / Math.PI);
    }

    var bearing = 0

    // console.log('getMarkerBearing:\nfromCoord: ', fromCoord, '\ntoCoord: ', toCoord)
    if(toCoord != undefined) {
      const λ1 = fromCoord.latitude
      const φ1 = fromCoord.longitude
      const λ2 = toCoord.latitude
      const φ2 = toCoord.longitude

      var y = Math.sin(λ2-λ1) * Math.cos(φ2);
      var x = Math.cos(φ1)*Math.sin(φ2) -
              Math.sin(φ1)*Math.cos(φ2)*Math.cos(λ2-λ1);
      bearing = toDegrees(Math.atan2(y, x));
    }
    
    // console.log('Math.sin:', Math.sin(λ2-λ1))
    // console.log('λ1: ', λ1, 'φ1: ', φ1, '\nλ2: ', λ2, 'φ2: ', φ2, '\nx: ', x, 'y: ', y, '\nBearing: ', bearing)
    // console.log('Bearing: ', bearing)
    return bearing
  }

*/