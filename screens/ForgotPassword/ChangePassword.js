import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";
import { ChangePasswordURL } from "../../assests/ApiUrl";

export default class ChangePassword extends Component {
  state = {
    mobile: "",
    password1: "",
    password2: ""
  };

  componentDidMount() {
    this.password1Input.focus();
    let mob = this.props.navigation.getParam("mobile");
    console.log("mob::" + mob);
    this.setState({ mobile: mob });
  }
  ChangePasswordApi = () => {
    console.log("In ChangePasswordApi");
    if (this.state.password1.length < 5) {
      Alert.alert("Password must be atleast 5 characters long!");
      return;
    }
    if (this.state.password1 != this.state.password2) {
      Alert.alert("Passwords do not match!");
      return;
    }
    fetch(ChangePasswordURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        u_number: this.state.mobile,
        U_pass: this.state.password1
      })
    })
      .then(data => {
        return data.json();
      })
      .then(data => {
        console.log("ChangePassword Response", data);
        if (data.message == "password updated succesfully") {
          Alert.alert("Password Updated Successfully!");
          this.props.navigation.navigate("Login");
        } else {
          Alert.alert(data.message);
        }
      })
      .catch(error => {
        console.log("Api call error");
        console.log(error.message);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onSubmitEditing={() => this.password2Input.focus()}
          ref={input => (this.password1Input = input)}
          autoCorrect={false}
          keyboardType="default"
          returnKeyType="next"
          placeholder="New Password"
          placeholderTextColor="rgba(225,225,225,0.7)"
          secureTextEntry
          onChangeText={text => {
            this.setState({ password1: text });
          }}
        />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          ref={input => (this.password2Input = input)}
          keyboardType="default"
          returnKeyType="next"
          placeholder="Re-enter Password"
          placeholderTextColor="rgba(225,225,225,0.7)"
          secureTextEntry
          onChangeText={text => {
            this.setState({ password2: text });
          }}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            this.ChangePasswordApi();
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
