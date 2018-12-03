import React from 'react';
import { 
  Platform, 
  Dimensions, 
  StyleSheet, 
  View, 
  Text, 
} from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const WIDTH = Dimensions.get('window').width

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  title: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  title: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  title: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const DrawerConfig = {
  drawerWidth: WIDTH*0.83,
  contentComponent: ({ navigation }) => {
    return(<DrawerContainer navigation={navigation} />)
  },
}

export default createDrawerNavigator({
    HomeStack,
    LinksStack,
    SettingsStack,
  }, 
  DrawerConfig
);

class DrawerContainer extends React.Component {
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
