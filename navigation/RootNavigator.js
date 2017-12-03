import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import { ConnectAccount } from '../Components';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: MainTabNavigator
    },
    ConnectAccount: {
      screen: ConnectAccount
    }
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal'
      }
    })
  }
);

export default class RootNavigator extends React.Component {
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return <RootStackNavigator />;
  }
}
