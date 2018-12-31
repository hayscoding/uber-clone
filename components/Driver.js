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

        const coordinate = new MapView.AnimatedRegion({
            latitude: driver.location.latitude,
            longitude: driver.location.longitude,
        })

        this.state = {
            driver: driver,
            prevDriver: prevDriver,
            coordinate: coordinate,
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


            // this.state.coordinate.timing({
            //     nextProps
            // }).start();

            // this.setState({
            //     coordinate: coordinate,
            // })
            console.log('PASSED TEST')
            console.log('nextCoord: ', nextCoord)
            // this.state.coordinate.timing({
            //     ...nextProps.coordinate,
            //     duration
            // }).start();
        }
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
        const driver = this.props.driver ? 
            this.props.driver : { uid: 'noDriversPassed', location: { latitude: 0, longitude: 0 }}
        const prevDriver = this.props.prevDriver ? 
            this.props.prevDriver : { uid: 'noDriversPassed', location: { latitude: 0, longitude: 0 }}

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

