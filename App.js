/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./screens/Login/LoginScreen";
import { createStackNavigator, createAppContainer } from "react-navigation";
import DashBoard from "./screens/DashBoard";
import AddLead from "./screens/AddLead";
import StatusList from "./screens/StatusList";
import ViewLead from "./screens/ViewLead";

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null
      }
    },

    DashBoard: {
      screen: DashBoard,
      navigationOptions: {
        headerLeft: null,
        headerStyle: {
          backgroundColor: "#57687c"
        },
        headerTintColor: "#fff"
      }
    },
    AddLead: {
      screen: AddLead,
      navigationOptions: {
        title: "Add Lead",
        headerStyle: {
          backgroundColor: "#57687c"
        },
        headerTintColor: "#fff"
      }
    },
    StatusList: {
      screen: StatusList,
      navigationOptions: {
        headerStyle: {
          backgroundColor: "#57687c"
        },
        headerTintColor: "#fff"
      }
    },
    ViewLead: {
      screen: ViewLead,
      navigationOptions: {
        headerStyle: {
          backgroundColor: "#57687c"
        },
        headerTintColor: "#fff"
      }
    }
  },
  {
    //starting route of stackNavigator
    initialRouteName: "Login"
  }
);
const App = createAppContainer(AppNavigator);
export default App;

//primary:#2c3e50
//dark:#031828
