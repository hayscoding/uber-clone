import React from 'react';
import { 
  Platform, 
  Dimensions, 
  StyleSheet, 
  View, 
  Text, 
} from 'react-native';

export default class MenuDrawer extends React.Component {
  render() {
    const { navigation } = this.props

    return (
      <View style={styles.container}>
        <Text
          onPress={() => navigation.navigate('Home')}
          style={styles.uglyDrawerItem}>
          Home
        </Text>
        <Text
          onPress={() => navigation.navigate('Links')}
          style={styles.uglyDrawerItem}>
          Links
        </Text>
        <Text
          onPress={() => navigation.navigate('Settings')}
          style={styles.uglyDrawerItem}>
          Settings  
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    paddingTop: 40,
    paddingHorizontal: 20
  },
  uglyDrawerItem: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#E73536',
    padding: 15,
    margin: 5,
    borderRadius: 2,
    borderColor: '#E73536',
    borderWidth: 1,
    textAlign: 'center'
  }
})
