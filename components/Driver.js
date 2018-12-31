import React from 'react';
import {
    Image, View,
} from 'react-native';
import { 
    MapView, 
} from 'expo';

export default class Driver extends React.Component {
    constructor(props) {
        super(props)

        const driver = this.props.driver ? 
            this.props.driver : { uid: 'noDriversPassed', location: { latitude: 0, longitude: 0 }}
        const prevDriver = this.props.prevDriver ? 
            this.props.prevDriver : { uid: 'noDriversPassed', location: { latitude: 0, longitude: 0 }}

        this.state = {
            driver: driver,
            prevDriver: prevDriver,
        }
    }
/*
    animateDriverToCoord(index, coord, cb) {
        // console.log('animateMarker', coord)
        const nextCoord = {
            latitude: coord.latitude,
            longitude: coord.longitude
        };

        this.state.drivers[index].timing(nextCoord).start(() => { cb() });
    }*/

    render() {
        
        const coordinate = new MapView.AnimatedRegion({
            latitude: this.state.driver.location.latitude,
            longitude: this.state.driver.location.longitude,
        })

        console.log('Driver Component\ndriver: ', this.state.driver, '\nprevDriver: ', this.state.prevDriver)

        return(
             <MapView.Marker.Animated
                coordinate={coordinate}
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
                    }} />
            </MapView.Marker.Animated>
        )  
    }
    
}

