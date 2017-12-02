import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

import { TabNavigator } from 'react-navigation';

class Trips extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Trips',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => <Text>Icon</Text>
  };

  render() {
    return (
      <View>
        <Button
          onPress={() => this.props.navigation.navigate('Settings')}
          title="Go to Settings"
        />
        <Text>List view goes here</Text>
      </View>
    );
  }
}

class Settings extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ tintColor }) => <Text>notif Icon</Text>
  };

  render() {
    return (
      <View>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Go back home"
        />
        <Text>Settings FTW</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  }
});

const MyApp = TabNavigator(
  {
    Trips: {
      screen: Trips
    },
    Settings: {
      screen: Settings
    }
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: 'pink'
    }
  }
);

export default MyApp;
