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

    this.state = {
      phone: null,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1 /* Change to flex 3 for proper style*/, backgroundColor: '#007bff'}}>
          <Image 
            style={{}}
            source={require('../assets/images/uber_text_logo.png')} 
          />
        </View>
        <View style={{flex: 2, backgroundColor: 'white'}}>
          <Text style={{}}>Get moving with Uber</Text>
          <TextInput 
            style={{}}
            keyboardType="number-pad"
            onChangeText={(num) => this.setState({phone: num})}
            onSubmitEditing={() => {}}
            value={this.state.num}
            placeholder={'Enter your mobile number'}
            placeholderTextColor={'#a3a3a3'}
          />
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
