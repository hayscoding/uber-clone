import React from 'react';
import { Text, View } from 'react-native';
import { Driver } from '../components/Driver'

export default class Drivers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            markers: [],
        };
    }

    render() {
        // this.state.testMarkers.map((driver) => {
        //         console.log('driver')
        //      // return <Driver driver={driver} />
        //  })

        return(
            <View>
                <Driver driver={{location: {latitude: 30.30032, longitude: -97.73968}}} />
            </View>
        )
    }

    setGeoQueryEvents(geoQuery) {
        GeoFireAPI.setReadyRegistration(geoQuery)
        GeoFireAPI.setKeyEnteredRegistration(geoQuery, (driver) => { 
            this.addNewDriver(driver) 
        })
        GeoFireAPI.setKeyMovedRegistration(geoQuery, (driver) => { 
            this.updateDriver(driver) 
        })
        GeoFireAPI.setKeyExitedRegistration(geoQuery, (driver) => { 
            this.removeDriver(driver) 
        })
    }

    addNewDriver(driver) {
        //Must keep state calls in runAfterInteractions() to prevent simultaneous setState() calls
        InteractionManager.runAfterInteractions(() => {
            const updatedMarkers = this.state.testMarkers.slice()

            updatedMarkers.push(driver)

            this.setState({testMarkers: updatedMarkers})
        })
    }

    updateDriver(driver) {
        InteractionManager.runAfterInteractions(() => {
            const updatedMarkers = this.state.testMarkers.slice()
            const index = updatedMarkers.findIndex((_driver) => {
                    return driver.uid == _driver.uid
                })

            updatedMarkers.splice(index, 1, driver)

            this.setState({testMarkers: updatedMarkers})
        })
    }

    removeDriver(driver) {
        InteractionManager.runAfterInteractions(() => {
            const updatedMarkers = this.state.testMarkers.slice()
            const index = updatedMarkers.findIndex((_driver) => {
                    return driver.uid == _driver.uid
                })

            updatedMarkers.splice(index, 1)

            this.setState({testMarkers: updatedMarkers})
        })
    }
}
