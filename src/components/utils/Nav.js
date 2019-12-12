import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

// eslint-disable-next-line react/prefer-stateless-function
const Nav = ({ navigate }) => {
  return (
    <View style={styles.nav}>
      <TouchableOpacity onPress={() => navigate('Home')}>
        <Icon name="home" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('Post')}>
        <Icon name="plus-square" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('Profile')}>
        <Icon name="user" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    height: '10%',
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    elevation: 0.5,
    alignItems: 'center',
    borderTopColor: 'grey',
    borderTopWidth: 0.2,
  },

  icon: {
    color: 'black',
    fontSize: 26,
  },
});

export default Nav;
