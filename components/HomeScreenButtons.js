import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Ionicons';

import { DestinationButton } from '../components/DestinationButton';
import { CurrentLocationButton } from '../components/CurrentLocationButton';
import { SuggestedDestinationButton } from '../components/SuggestedDestinationButton';

export const HomeScreenButtons = function(props) {
    const navigation = props.navigation

    const toggleDestinationInput = props.toggleDestinationInput != undefined ? 
        props.toggleDestinationInput : () => { console.log('toggleDestinationInput() not passed to DestinationButton()') }
    const toggleComponentOverlay = props.toggleComponentOverlay != undefined ? 
        props.toggleComponentOverlay : () => { console.log('toggleComponentOverlay() not passed to DestinationButton()') }
    const setRegionToCurrentLocation = props.setRegionToCurrentLocation != undefined ? 
        props.setRegionToCurrentLocation : () => { console.log('setRegionToCurrentLocation() not passed to DestinationButton()') }

    return(
      <View>
        <Icon name="md-menu" color="#000000" size={32} style={styles.menuIcon}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
        <DestinationButton cb={() => { toggleDestinationInput() }} />
        <SuggestedDestinationButton cb={() => { toggleComponentOverlay() }} />
        <CurrentLocationButton cb={() => { setRegionToCurrentLocation() }} />
      </View>
    )
}

const styles = StyleSheet.create({
    menuIcon: {
        zIndex: 9, 
        position: 'absolute', 
        top: 40, 
        left: 20,
    }
})