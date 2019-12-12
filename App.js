import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { Home, Profile, Post } from './src/components/pages';

export default function App() {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="red"
        translucent
      />
      <AppContainer />
    </>
  );
}

const AppNavigator = createStackNavigator(
  {
    Post: {
      screen: Post,
    },
    Home: {
      screen: Home,
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    initialRouteName: 'Home',
  },
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});

const AppContainer = createAppContainer(AppNavigator);
