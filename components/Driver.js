import React from 'react';
import {
    StyleSheet,
    Image,
} from 'react-native';
import { 
    MapView, 
} from 'expo';

export const Driver = function(props) {
    const driver = props.driver
    console.log('animatedDriver(): ', props.driver)

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
            }} />
        </MapView.Marker.Animated>
    )
}

// const styles = StyleSheet.create({
// })