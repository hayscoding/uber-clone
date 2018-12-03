import React from 'react';
import { 
  Platform, 
  Dimensions, 
  StyleSheet, 
  ScrollView,
  View, 
  Text, 
} from 'react-native';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default class MenuDrawer extends React.Component {
  render() {
    const { navigation } = this.props

    return (
      <View style={styles.container}>
        <ScrollView style={{flex: 1,}}>
          <View style={{flex: 1}}>
          </View>
          <View style={{flex: 1, backgroundColor: 'white'}}>
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
        </ScrollView>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 40,
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
