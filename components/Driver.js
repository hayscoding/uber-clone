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
    }

    render() {
        const driver = this.props.driver ? 
            this.props.driver : { uid: 'noDriversPassed', location: { latitude: 0, longitude: 0 }}
        const prevDriver = this.props.prevDriver ? 
            this.props.prevDriver : { uid: 'noDriversPassed', location: { latitude: 0, longitude: 0 }}

        const coordinate = new MapView.AnimatedRegion({
            latitude: this.props.driver.location.latitude,
            longitude: this.props.driver.location.longitude,
        })

        console.log('Driver Componet\ndriver: ', driver, '\nprevDriver: ', prevDriver)

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

