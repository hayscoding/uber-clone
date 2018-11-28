import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { WebBrowser, MapView } from 'expo';
import { DrawerActions } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Ionicons';

import { MonoText } from '../components/StyledText';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

function DestinationButton() {
  return(
    <View style={{
      zIndex: 9,
      position: 'absolute',
      flexDirection: 'row',
      width: (WIDTH-40), //40 because of left property multiplied by 2
      height: 60,
      top: 110,
      left: 20,
      borderRadius: 2,
      backgroundColor: 'white',
      alignItems: 'center',
      shadowColor: '#000000',
      elevation: 7,
      shadowRadius: 5,
      shadowOpacity: 1.0
    }}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={{fontSize: 8}}>{'\u25A0'}</Text>
      </View>
      <View style={{flex: 4}}>
        <Text style={{fontFamily: 'sans-serif-thin', fontSize: 21, color: "#545454"}}>Where to?</Text>
      </View>
            
      <View style={{
        flex: 1, 
        borderLeftWidth: 1,
        borderColor: '#ededed'
      }}>
        <Icon name="md-car" color="#000000" size={25} 
          style={{
            alignSelf: 'center',
          }}
        />
      </View>
    </View>
  )
  
}

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Icon name="md-menu" color="#000000" size={35} style={{zIndex: 9, position: 'absolute', top: 40, left: 20}}
          onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
        />
        <DestinationButton />
        {/*
          <MapView
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={{width: WIDTH, height: HEIGHT, zIndex: 0}}
          />
        */}
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
