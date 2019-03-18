import React, { Component } from "react";
import { View, Image, StyleSheet, AsyncStorage } from "react-native";
import LoginForm from "./LoginForm";
import { StackActions, NavigationActions } from "react-navigation";

export default class LoginScreen extends Component {
  state = {
    load_page: false
  };
  componentDidMount = async () => {
    const value = await AsyncStorage.getItem("userId");

    if (value) {
      const name = await AsyncStorage.getItem("userName");
      console.log("name:" + name);
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: "DashBoard",
            params: { userName: name }
          })
        ]
      });

      this.props.navigation.dispatch(resetAction);
    } else {
      this.setState({ load_page: true });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.load_page && (
          <View style={styles.container}>
            <View style={styles.loginContainer}>
              <Image
                resizeMode="contain"
                style={styles.logo}
                source={require("../../assests/AdiClassesLogo.png")}
              />
            </View>
            <View style={styles.formContainer}>
              <LoginForm navigation={this.props.navigation} />
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c3e50"
  },
  loginContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center"
  },
  logo: {
    position: "absolute",
    width: 300,
    height: 100
  },
  formContainer: {
    flexGrow: 1
  }
});
