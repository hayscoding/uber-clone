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

        this.state = {
            drivers: this.props.drivers,
        };
    }

    render() {
        console.log('DRIVERS COMPONENT\ndrivers: ', this.state.drivers)
        // const driversFunc = () => {
        //         this.state.drivers.map((driver) => {
        //         console.log('Drivers Component()\ndriver: ', driver)
        //          // return <Driver driver={driver} />
        //     })
        // }

        return(
            <View>
            </View>
        )
    }
}
