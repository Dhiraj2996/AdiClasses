import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";
import { VerifyOtpURL } from "../../assests/ApiUrl";

export default class OTPScreen extends Component {
  state = {
    mobile: "",
    otp: "",
    checkinput: "initial"
  };
  reset = mob => {
    //this.close()
    //this.setState({ size1, open1: true })

    let random;
    let max = 1000;
    let min = 9000;
    random = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(random);
    this.setState({ otp: random });

    let Inquirymsg = "Hey there, here is your otp for AdiClasses:" + random;

    let authkey = "226898AmIKM4WBH5b502d68";
    let sender = "MSGIND";
    let route = "4";
    let number = mob;
    let urlInquiry =
      "http://control.msg91.com/api/sendhttp.php?authkey=" +
      authkey +
      "&mobiles=" +
      number +
      "&message=" +
      Inquirymsg +
      "&sender=" +
      sender +
      "&route=" +
      route +
      "&country=91";

    fetch(urlInquiry, { mode: "no-cors" }).then(response => {
      console.log(response);
      // fetch(UpdateOtp, {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({
      //     u_number: this.state.mobile_num,
      //     otp: random
      //   })
      // })
      //   .then(data => {
      //     return data.json();
      //   })
      //   .then(data => {
      //     console.log("OtpUpdate Response", data);
      //   });
    });
  };
  componentDidMount() {
    this.MobileInput.focus();
    let mob = this.props.navigation.getParam("mobile");
    this.setState({ mobile: mob });
    this.reset(mob);
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          ref={input => (this.MobileInput = input)}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="numeric"
          returnKeyType="next"
          placeholder="Enter OTP"
          placeholderTextColor="rgba(225,225,225,0.7)"
          onChangeText={text => {
            this.setState({ checkinput: text });
          }}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            if (this.state.checkinput == this.state.otp) {
              this.props.navigation.navigate("ChangePassword", {
                mobile: this.state.mobile
              });
            } else {
              Alert.alert("Wrong OTP!");
            }
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
