import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  AsyncStorage
} from "react-native";
import { LoginUrl } from "../../assests/ApiUrl";

export default class LoginForm extends Component {
  state = {
    mobileNumber: "",
    password: ""
  };
  LoginApi = (phno, pwd) => {
    console.log("In LoginApi");
    fetch(LoginUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mobileNumber: phno,
        password: pwd
      })
    })
      .then(data => {
        return data.json();
      })
      .then(data => {
        //console.log("Login Response", data);

        if (data.message == "Login succesfully") {
          //this._storeData(data.userId);
          console.log("data received: " + data.userId + " " + data.userName);
          this._storeData(data.userId, data.userName);
          this.props.navigation.navigate("DashBoard", {
            userName: data.userName
          });
        } else if (data.message) {
          Alert.alert("Invalid Username or Password");
        }
      })
      .catch(error => {
        console.log("Api call error");
        console.log(error.message);
      });
  };
  _storeData = async (user_id, user_name) => {
    try {
      console.log("storing: " + user_id + " " + user_name);
      await AsyncStorage.multiSet([
        ["userId", JSON.stringify(user_id)],
        ["userName", user_name]
      ]);
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

  Login = () => {
    //console.log(      "In Login m:" + this.state.mobileNumber + " p:" + this.state.password    );
    if (this.state.password == "") {
      Alert.alert("Please Enter Password");
      return;
    }
    if (this.state.mobileNumber == "") {
      Alert.alert("Please Enter Mobile Number");
    }

    this.LoginApi(this.state.mobileNumber, this.state.password);
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onSubmitEditing={() => this.passwordInput.focus()}
          autoCorrect={false}
          keyboardType="numeric"
          returnKeyType="next"
          placeholder="Mobile Number"
          placeholderTextColor="rgba(225,225,225,0.7)"
          onChangeText={text => this.setState({ mobileNumber: text })}
        />

        <TextInput
          style={styles.input}
          returnKeyType="go"
          ref={input => (this.passwordInput = input)}
          placeholder="Password"
          onChangeText={text => this.setState({ password: text })}
          placeholderTextColor="rgba(225,225,225,0.7)"
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            this.Login();
          }}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ margin: 10 }}
          onPress={() => {
            this.props.navigation.navigate("ForgotPassword");
          }}
        >
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 20
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
  },
  forgotPassword: {
    color: "#fff",
    textAlign: "right",
    fontWeight: "700"
  }
});
