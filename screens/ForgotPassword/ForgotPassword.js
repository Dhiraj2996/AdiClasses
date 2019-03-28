import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";
import { ForgetPasswordURL } from "../../assests/ApiUrl";

export default class ForgotPassword extends Component {
  state = {
    mobile: ""
  };
  componentDidMount() {
    this.MobileInput.focus();
  }
  PassrvApi = () => {
    console.log("In PassrvApi,mob:" + this.state.mobile);
    fetch(ForgetPasswordURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        u_number: this.state.mobile
      })
    })
      .then(data => {
        return data.json();
      })
      .then(data => {
        console.log("Passrv Response", data);
        if (data.message == "Correct number") {
          this.props.navigation.navigate("OTPScreen", {
            mobile: this.state.mobile
          });
        } else {
          Alert.alert("Invalid Mobile Number");
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
          ref={input => (this.MobileInput = input)}
          autoCorrect={false}
          keyboardType="numeric"
          returnKeyType="next"
          placeholder="Mobile Number"
          placeholderTextColor="rgba(225,225,225,0.7)"
          onChangeText={text => {
            this.setState({ mobile: text });
          }}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            this.PassrvApi();
            // this.props.navigation.navigate("OTPScreen", {
            //   mobile: "8484902449"
            // });
          }}
        >
          <Text style={styles.buttonText}>NEXT</Text>
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
