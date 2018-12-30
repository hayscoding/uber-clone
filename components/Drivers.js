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
            drivers: [],
        };
    }

    render() {
        // this.state.drivers.map((driver) => {
        //         console.log('driver')
        //      // return <Driver driver={driver} />
        //  })
        return(
            <View>
                <Driver driver={{location: {latitude: 30.30032, longitude: -97.73968}}} />
            </View>
        )
    }
}
