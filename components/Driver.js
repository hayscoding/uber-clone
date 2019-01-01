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

        const coordinate = new MapView.AnimatedRegion({
            latitude: driver.location.latitude,
            longitude: driver.location.longitude,
        })

        this.state = {
            driver: driver,
            coordinate: coordinate,
            bearing: 0,
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('COMPONENT WILL RECEIVE PROPS()')
        if(this.props.driver != nextProps.driver){
            console.log('PASSED TEST')

            // const nextCoord = new MapView.AnimatedRegion({
            //     latitude: nextProps.driver.location.latitude,
            //     longitude: nextProps.driver.location.longitude,
            // })
            const nextCoord = nextProps.driver.location

            this.getBearing(nextCoord)
            console.log('PASSED TEST')
            console.log('nextCoord: ', nextCoord)

            this.state.coordinate.timing(nextCoord, {duration: 500}).start();

            // this.setState({
            //     coordinate: coordinate,
            // })
            
            // this.state.coordinate.timing({
            //     ...nextProps.coordinate,
            //     duration
            // }).start();
        }
    }


    getBearing(nextCoord) {
            console.log('GET BEARING ', nextCoord)
        // function toDegrees (radians) {
        //     return radians * (180 / Math.PI);
        // }

        // var bearing = 0

        // // console.log('getMarkerBearing:\nfromCoord: ', fromCoord, '\ntoCoord: ', toCoord)
        // if(toCoord != undefined) {
        //     const λ1 = fromCoord.latitude
        //     const φ1 = fromCoord.longitude
        //     const λ2 = toCoord.latitude
        //     const φ2 = toCoord.longitude

        //     var y = Math.sin(λ2-λ1) * Math.cos(φ2);
        //     var x = Math.cos(φ1)*Math.sin(φ2) -
        //     Math.sin(φ1)*Math.cos(φ2)*Math.cos(λ2-λ1);
        //         bearing = toDegrees(Math.atan2(y, x));
        // }

        // // console.log('Math.sin:', Math.sin(λ2-λ1))
        // // console.log('λ1: ', λ1, 'φ1: ', φ1, '\nλ2: ', λ2, 'φ2: ', φ2, '\nx: ', x, 'y: ', y, '\nBearing: ', bearing)
        // // console.log('Bearing: ', bearing)
        return 0
    }


    // animateDriverToCoord(index, coord, cb) {
    //     // console.log('animateMarker', coord)
    //     const nextCoord = {
    //         latitude: coord.latitude,
    //         longitude: coord.longitude
    //     };

    //     this.props.driver.timing(nextCoord).start(() => { cb() });
    // }

    render() {
        return(
            <MapView.Marker.Animated
                coordinate={this.state.coordinate}
                anchor={{x: 0.35, y: 0.32}} //centers car.png image
                ref={marker => { this.marker = marker }}
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

