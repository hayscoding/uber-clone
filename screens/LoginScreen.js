import React from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Animated,
  Image,
  TextInput,
  Text,
} from 'react-native'
import { DrawerItems, SafeAreaView } from 'react-navigation';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    headerMode: 'none',
    headerVisible: false,
    header: null,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 3, backgroundColor: '#007bff'}}>
          <Image 
            style={{}}
            source={require('../assets/images/uber_text_logo.png')} 
          />
        </View>
        <View style={{flex: 2, backgroundColor: 'white'}}>
          <Text>Get moving with Uber</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});
