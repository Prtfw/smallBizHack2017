import React from "react";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TabNavigator, TabBarBottom } from "react-navigation";

import Colors from "../constants/Colors";

import FormBuilderScreen from "../Components/Screens/FormBuilder";

export default TabNavigator(
  {
    FormBuilder: {
      screen: FormBuilderScreen
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case "FormBuilder":
            iconName =
              Platform.OS === "ios"
                ? `ios-information-circle${focused ? "" : "-outline"}`
                : "md-information-circle";
            break;
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      }
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    animationEnabled: false,
    swipeEnabled: false
  }
);
