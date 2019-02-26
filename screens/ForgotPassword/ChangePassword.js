import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from "react-native";

export default class ChangePassword extends Component {
  state = {
    mobile: ""
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onSubmitEditing={() => this.passwordInput.focus()}
          autoCorrect={false}
          keyboardType="default"
          returnKeyType="next"
          placeholder="New Password"
          placeholderTextColor="rgba(225,225,225,0.7)"
        />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onSubmitEditing={() => this.passwordInput.focus()}
          autoCorrect={false}
          keyboardType="default"
          returnKeyType="next"
          placeholder="Re-enter Password"
          placeholderTextColor="rgba(225,225,225,0.7)"
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            this.props.navigation.navigate("Login");
          }}
        >
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#2c3e50",
    flexDirection: "column"
  },
  input: {
    height: 50,
    backgroundColor: "rgba(225,225,225,0.2)",
    marginBottom: 10,
    padding: 10,
    fontSize: 20,
    color: "#fff"
  },
  buttonContainer: {
    backgroundColor: "#2980b6",
    paddingVertical: 15
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700"
  }
});