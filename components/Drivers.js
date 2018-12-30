import React from 'react';
import { 
    Text, 
    View, 
    TouchableOpacity, 
} from 'react-native';
import { Driver } from '../components/Driver'

export default class Drivers extends React.Component {
    constructor(props) {
        super(props);
    }

    getDrivers() {
        return this.props.drivers.forEach((driver) => {
             return <Driver driver={driver} />
        })
    }

    render() {
        // console.log('DRIVERS COMPONENT\ndrivers: ', this.props.drivers[0])

        return(
            <View>
                <Driver driver={this.props.drivers[0]} />
            </View>
        )
    }
}
