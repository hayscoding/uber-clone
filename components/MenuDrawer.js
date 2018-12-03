import React from 'react';
import { 
  Platform, 
  Dimensions, 
  StyleSheet, 
  ScrollView,
  View, 
  Text, 
  TouchableOpacity,
} from 'react-native';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default class MenuDrawer extends React.Component {
  render() {
    const { navigation } = this.props

    return (
      <View style={styles.container}>
        <ScrollView style={{flex: 1,}}>
          <View style={{flex: 1, height: 250,}}>
          </View>
          <View style={{flex: 1, backgroundColor: 'white', paddingTop: 10}}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text
                style={styles.link}>
                Home
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text
                onPress={() => navigation.navigate('Links')}
                style={styles.link}>
                Your Trips
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text
                onPress={() => navigation.navigate('Settings')}
                style={styles.link}>
                Help  
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text
                onPress={() => navigation.navigate('Settings')}
                style={styles.link}>
                Payment  
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text
                onPress={() => navigation.navigate('Settings')}
                style={styles.link}>
                Ride Pass  
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text
                onPress={() => navigation.navigate('Settings')}
                style={styles.link}>
                Send a Gift  
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text
                onPress={() => navigation.navigate('Settings')}
                style={styles.link}>
                Free Rides  
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text
                onPress={() => navigation.navigate('Settings')}
                style={styles.link}>
                Settings  
              </Text>
            </TouchableOpacity>
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
  },
  link: {
    flex: 1, 
    fontSize: 20,
    padding: 6,
    paddingLeft: 10,
    margin: 5,
    textAlign: 'left',
  },
})
