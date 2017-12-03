import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import { TempForm } from '../Components';
import FormBuilderScreen from '../Components/Screens/FormBuilder';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: MainTabNavigator
    },
    Form: {
      screen: TempForm // to fill in form
    },
    FormBuilder: {
      screen: FormBuilderScreen
    }
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal'
      },
      title: 'Fat Fingers Unleashed'
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
