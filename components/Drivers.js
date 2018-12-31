import React from 'react';
import { 
    Text, 
    View, 
    TouchableOpacity, 
} from 'react-native';
import Driver from '../components/Driver'

export default class Drivers extends React.Component {
    constructor(props) {
        super(props);
    }

    getDrivers() {
        // console.log('GET DRIVERS CALLED\ndrivers: ', this.props.drivers)
        return this.props.drivers.map((driver) => {
            console.log('getDriver()\ndriver: ', driver, '\nprevDriver: ', this.findPrevDriver(driver))
            return <Driver driver={driver} />
        })
    }

    findPrevDriver(driver) {
        if(this.props.prevDrivers)
            return this.props.prevDrivers.find((pDriver) => {
                return pDriver.uid == driver.uid
            })
        else
            return null
    }

    render() {
        // console.log('DRIVERS COMPONENT:\n', )

        return(
            <View>
            {this.getDrivers()}
            </View>
        )
    }
}
