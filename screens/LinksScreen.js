import React from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Animated 
} from 'react-native'
import { DrawerItems, SafeAreaView } from 'react-navigation';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  constructor(props) {
    super(props);

    this.state = {
      pickerSelection: 'Default value!',
      pickerDisplayed: false
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
