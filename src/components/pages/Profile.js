import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Nav from '../utils/Nav';

class Profile extends Component {
  state = {
    text: '',
  };

  static navigationOptions = {
    title: 'Profile',
    headerStyle: {
      backgroundColor: '#45a1f1',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    const {
      navigation: { navigate },
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.profile} />
        <Nav navigate={navigate} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    flex: 1,
  },
});
export default Profile;
