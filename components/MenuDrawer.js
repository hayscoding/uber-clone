import React from 'react';
import { 
  Platform, 
  Dimensions, 
  StyleSheet, 
  ScrollView,
  View, 
  Text, 
  TouchableOpacity,
  Image,
} from 'react-native';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default class MenuDrawer extends React.Component {
  navLink(nav, text) {
    return(
      <TouchableOpacity onPress={() => this.props.navigation.navigate(nav)}>
        <Text style={styles.link}>{text}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroller}>
          <View style={styles.topLinks}>
            <View style={styles.profile}>
              <View style={styles.imgView}>
                <Image source={require('../assets/images/hays-profile.jpg')} style={styles.img} />
              </View>
              <View style={styles.profileText}>
                <Text style={styles.name}>Hays Stanford</Text>
                <Text style={styles.rating}>5.00 {'\u2605'}</Text>
              </View>
            </View>
            <View style={styles.external}>
              <Text style={[styles.extLink, {color: '#a8a8a8', paddingTop: 15}]}>Do more with your account</Text>
              <Text style={styles.extLink}>Get food delivery</Text>
              <Text style={styles.extLink}>Make money driving</Text>
            </View>
          </View>
          <View style={styles.bottomLinks}>
            {this.navLink('Home', 'Home')}
            {this.navLink('Links', 'Your Trips')}
            {this.navLink('Home', 'Help')}
            {this.navLink('Home', 'Payment')}
            {this.navLink('Home', 'Ride Pass')}
            {this.navLink('Home', 'Send a Gift')}
            {this.navLink('Home', 'Free Rides ')}
            {this.navLink('Settings', 'Settings')}
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <Text style={styles.legal}>
            Legal
          </Text>
          <Text style={styles.version}>
           v4.238.10003
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scroller: {
    flex: 1,
  },
  topLinks: {
    height: 270,
  },
  bottomLinks: {
    flex: 1, 
    backgroundColor: 'white', 
    paddingTop: 10, 
    paddingBottom: 10,
  },
  profile: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingTop: 25, 
    borderBottomWidth: 1, 
    borderBottomColor: '#777777',
  },
  profileText: {
    flex: 3, 
    flexDirection: 'column', 
    justifyContent: 'center',
  },
  img: {
    height: 70, 
    width: 70, 
    borderRadius: 50
  },
  imgView: {
    flex: 1,
    paddingLeft: 20, 
    paddingRight: 20
  },
  name: {
    fontSize: 20, 
    paddingBottom: 5, 
    color: 'white', 
    textAlign: 'left'
  },
  rating: {
    fontSize: 15, 
    paddingTop: 5, 
    color: 'white', 
    textAlign: 'left', 
    color: 'gray'
  },
  footer: {
    height: 50, 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'white', 
    borderTopWidth: 1, 
    borderTopColor: 'lightgray',
  },
  version: {
    flex: 1, 
    textAlign: 'right', 
    marginRight: 20, 
    color: '#9b9b9b'
  },
  legal: {
    flex: 1, 
    marginLeft: 20, 
    fontSize: 16
  },
  external: {
    flex: 1, 
    paddingLeft: 20,
  },
  link: {
    flex: 1, 
    fontSize: 20,
    padding: 6,
    paddingLeft: 14,
    margin: 5,
    textAlign: 'left',
  },
  extLink: {
    fontSize: 15, 
    color: 'white', 
    paddingTop: 10,
  },
})
