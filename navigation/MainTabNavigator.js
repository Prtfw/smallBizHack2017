import React from 'react';
import { Platform, TouchableOpacity, Text } from 'react-native';
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import { ConnectAccount, FormList } from '../Components';

export default TabNavigator(
  {
    Forms: {
      screen: FormList
    },
    ConnectAccount: {
      screen: ConnectAccount
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        let Icon = Ionicons;
        switch (routeName) {
          case 'Forms':
            iconName =
              Platform.OS === 'ios'
                ? `ios-information-circle${focused ? '' : '-outline'}`
                : 'md-information-circle';
            break;
          case 'ConnectAccount':
            Icon = EvilIcons;
            iconName = 'gear';
            break;
        }
        return (
          <Icon
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      }
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false
  }
);
