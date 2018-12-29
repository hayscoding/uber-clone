import React from 'react';
import { Text } from 'react-native';

export class Drivers extends React.Component {

	showDrivers() {
	    return this.state.testMarkers.map((driver) => {
	        return this.animatedDriver(driver)
	    })
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

	render() {
		return <Text {...this.props} style={[this.props.style, { fontFamily: 'space-mono' }]} />;
	}
}
