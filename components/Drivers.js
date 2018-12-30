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

    render() {
        // console.log('DRIVERS COMPONENT\ndrivers: ', this.state.drivers[0])
        this.props.drivers.forEach((driver) => {
            console.log('Drivers Component()\ndriver: ', driver)
             // return <Driver driver={driver} />
        })

        return(
            <View>
            </View>
        )
    }
}
