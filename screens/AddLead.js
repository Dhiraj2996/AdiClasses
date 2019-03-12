import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  DatePickerAndroid,
  TimePickerAndroid
} from "react-native";
import styled from "styled-components";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import { CheckBox } from "react-native-elements";

var leadType_props = [{ label: "B2B", value: 0 }, { label: "B2C", value: 1 }];

var scholar_props = [
  { label: "Day Scholar", value: 0 },
  { label: "Residential", value: 1 }
];
var foundation_props = [{ label: "Yes", value: 0 }, { label: "No", value: 1 }];
var infrastucture_props = [
  { label: "Good", value: 0 },
  { label: "Average", value: 1 },
  { label: "Bad", value: 2 }
];

var studentFinanceStatus_props = [
  { label: "Very Good", value: 0 },
  { label: "Middle Class", value: 1 },
  { label: "Poor", value: 2 }
];
var b2cClass_props = [
  { label: "7th", value: 0 },
  { label: "8th", value: 1 },
  { label: "9th", value: 2 },
  { label: "10th", value: 3 },
  { label: "11th", value: 4 },
  { label: "12th", value: 5 }
];
export default class AddLead extends Component {
  state = {
    leadType: 0,
    strength: "",
    residentialCampus: 0,
    scholar: 0,
    foundation: 0,
    infrastructure: 0,
    decisionMaker: "",
    studentFinanceStatus: 0,
    b2cClass: 0,
    CETchecked: false,
    NEETchecked: false,
    IITchecked: false,
    Advancedchecked: false,
    nextMeetDate: "",
    nextMeetTime: ""
  };

  pickDate = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date()
      });
      if (action === DatePickerAndroid.dismissedAction) {
        return;
      }
      let newDate = new Date(year, month, day);
      this.setState({ nextMeetDate: newDate.toLocaleDateString() });
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };
  pickTime = async () => {
    let temp = "";
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: false // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
        let tempMinutes = "";
        let tempHour = "";
        if (parseInt(minute) < 10) {
          tempMinutes = "0" + minute;
        }
        if (parseInt(hour) >= 12) {
          tempHour = parseInt(hour) - 12;
          if (parseInt(tempHour) < 10) {
            tempHour = "" + "0" + tempHour;
          }
          temp = tempHour + ":" + tempMinutes + " pm";
        } else {
          temp = tempHour + ":" + tempMinutes + " am";
        }

        this.setState({ nextMeetTime: temp });
      }
    } catch ({ code, message }) {
      console.warn("Cannot open time picker", message);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{ marginBottom: 10 }}>
          <View style={styles.card}>
            <RadioForm
              radio_props={leadType_props}
              initial={this.state.leadType}
              onPress={value => {
                this.setState({ leadType: value });
              }}
              formHorizontal={true}
              labelHorizontal={true}
              animation={true}
              //buttonColor={"#fff"}
              labelStyle={{ fontSize: 20, padding: 10, color: "#fff" }}
            />
          </View>
          {this.state.leadType == 0 && (
            <View style={styles.card}>
              <TextInput
                style={styles.input}
                onSubmitEditing={() => this.B2Bcity.focus()}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
                placeholder="School/College Name"
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
              <TextInput
                style={styles.input}
                onSubmitEditing={() => this.B2Bdistrict.focus()}
                ref={input => (this.B2Bcity = input)}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
                placeholder="City/Town"
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
              <TextInput
                style={styles.input}
                onSubmitEditing={() => this.B2Bstate.focus()}
                ref={input => (this.B2Bdistrict = input)}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
                placeholder="District"
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
              <TextInput
                style={styles.input}
                onSubmitEditing={() => this.B2Bprincipal.focus()}
                ref={input => (this.B2Bstate = input)}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
                placeholder="State"
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
              <TextInput
                style={styles.input}
                autoCorrect={false}
                onSubmitEditing={() => this.B2BprincipalMobile1.focus()}
                ref={input => (this.B2Bprincipal = input)}
                keyboardType="default"
                returnKeyType="next"
                placeholder="Principal Name"
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
              <TextInput
                style={styles.input}
                onSubmitEditing={() => this.B2BprincipalMobile2.focus()}
                ref={input => (this.B2BprincipalMobile1 = input)}
                autoCorrect={false}
                keyboardType="numeric"
                returnKeyType="next"
                placeholder="Mobile 1"
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
              <TextInput
                style={styles.input}
                onSubmitEditing={() => this.B2BprincipalEmail.focus()}
                ref={input => (this.B2BprincipalMobile2 = input)}
                autoCorrect={false}
                keyboardType="numeric"
                returnKeyType="next"
                placeholder="Mobile 2"
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
              <TextInput
                style={styles.input}
                onSubmitEditing={() => this.B2BcontactPerson.focus()}
                ref={input => (this.B2BprincipalEmail = input)}
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                placeholder="Email"
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
              <TextInput
                style={styles.input}
                onSubmitEditing={() => this.B2BcontactPersonMobile.focus()}
                ref={input => (this.B2BcontactPerson = input)}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
                placeholder="Contact Person"
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
              <TextInput
                style={styles.input}
                onSubmitEditing={() => this.B2Bclass12Strength.focus()}
                ref={input => (this.B2BcontactPersonMobile = input)}
                autoCorrect={false}
                keyboardType="numeric"
                returnKeyType="next"
                placeholder="Mobile "
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
              <TextInput
                style={styles.input}
                onSubmitEditing={() => this.B2Bclass11Strength.focus()}
                ref={input => (this.B2Bclass12Strength = input)}
                autoCorrect={false}
                keyboardType="numeric"
                returnKeyType="next"
                placeholder="12th Class Strength "
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
              <TextInput
                style={styles.input}
                onSubmitEditing={() => this.B2B11thFee.focus()}
                ref={input => (this.B2Bclass11Strength = input)}
                autoCorrect={false}
                keyboardType="numeric"
                returnKeyType="next"
                placeholder="11th Class Strength "
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
              <TextInput
                style={styles.input}
                onSubmitEditing={() => this.B2Bclass10Strength.focus()}
                ref={input => (this.B2B11thFee = input)}
                autoCorrect={false}
                keyboardType="numeric"
                returnKeyType="next"
                placeholder="Fee"
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
              <TextInput
                style={styles.input}
                onSubmitEditing={() => this.B2B10thFee.focus()}
                ref={input => (this.B2Bclass10Strength = input)}
                autoCorrect={false}
                keyboardType="numeric"
                returnKeyType="next"
                placeholder="10th Class Strength "
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
              <TextInput
                style={styles.input}
                onSubmitEditing={() => this.B2BDecisionMaker.focus()}
                ref={input => (this.B2B10thFee = input)}
                autoCorrect={false}
                keyboardType="numeric"
                returnKeyType="next"
                placeholder="Fee"
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
              <TextInput
                style={styles.input}
                onSubmitEditing={() => this.B2BDecisionMakerMobile.focus()}
                ref={input => (this.B2BDecisionMaker = input)}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
                placeholder="Decision Maker Name"
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
              <TextInput
                style={styles.input}
                //onSubmitEditing={() => this.B2Bclass12Strength.focus()}
                ref={input => (this.B2BDecisionMakerMobile = input)}
                autoCorrect={false}
                keyboardType="numeric"
                returnKeyType="next"
                placeholder="Mobile "
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
              <View style={styles.flexColumn}>
                <NameText style={{ color: "#fff", fontSize: 24 }}>
                  Next Meeting Date and Time
                </NameText>

                <TouchableOpacity
                  onPress={() => this.pickDate()}
                  style={styles.input}
                >
                  {this.state.nextMeetDate ? (
                    <Text
                      style={{
                        color: "#fff",

                        fontSize: 20,
                        textAlign: "center"
                      }}
                    >
                      {this.state.nextMeetDate}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: "#fff",

                        fontSize: 20,
                        textAlign: "center"
                      }}
                    >
                      Select Date
                    </Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.pickTime()}
                  style={styles.input}
                >
                  {this.state.nextMeetTime ? (
                    <Text
                      style={{
                        color: "#fff",

                        fontSize: 20,
                        textAlign: "center"
                      }}
                    >
                      {this.state.nextMeetTime}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: "#fff",

                        fontSize: 20,
                        textAlign: "center"
                      }}
                    >
                      Select Time
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.flexColumn}>
                <NameText style={{ color: "#fff", fontSize: 24 }}>
                  Residential Campus?
                </NameText>
                <RadioForm
                  radio_props={foundation_props}
                  initial={this.state.residentialCampus}
                  onPress={value => {
                    this.setState({ residentialCampus: value });
                  }}
                  formHorizontal={false}
                  labelHorizontal={true}
                  animation={true}
                  //buttonColor={"#fff"}
                  labelStyle={{ fontSize: 20, color: "#fff" }}
                  buttonSize={10}
                  buttonOuterSize={20}
                  style={{ marginTop: 5 }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText style={{ color: "#fff", fontSize: 24 }}>
                  8,9,10 Foundation?
                </NameText>
                <RadioForm
                  radio_props={foundation_props}
                  initial={this.state.foundation}
                  onPress={value => {
                    this.setState({ foundation: value });
                  }}
                  formHorizontal={false}
                  labelHorizontal={true}
                  animation={true}
                  //buttonColor={"#fff"}
                  labelStyle={{ fontSize: 20, color: "#fff" }}
                  buttonSize={10}
                  buttonOuterSize={20}
                  style={{ marginTop: 5 }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText style={{ color: "#fff", fontSize: 24 }}>
                  Infrastructure
                </NameText>
                <RadioForm
                  radio_props={infrastucture_props}
                  initial={this.state.infrastructure}
                  onPress={value => {
                    this.setState({ infrastructure: value });
                  }}
                  formHorizontal={false}
                  labelHorizontal={true}
                  animation={true}
                  //buttonColor={"#fff"}
                  labelStyle={{ fontSize: 20, color: "#fff" }}
                  buttonSize={10}
                  buttonOuterSize={20}
                  style={{ marginTop: 5 }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText style={{ color: "#fff", fontSize: 24 }}>
                  Remarks
                </NameText>
                <TextInput
                  style={styles.multilineInput}
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="next"
                  multiline={true}
                />
              </View>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                  console.log("Button Pressed");
                }}
              >
                <Text style={styles.buttonText}>Add Lead</Text>
              </TouchableOpacity>
            </View>
          )}
          {this.state.leadType == 1 && (
            <View style={styles.card}>
              <TextInput
                style={styles.input}
                onSubmitEditing={() => this.B2CguardianNameInput.focus()}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
                placeholder="Student Name"
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
              <TextInput
                style={styles.input}
                onSubmitEditing={() => this.B2Cmobile1input.focus()}
                ref={input => (this.B2CguardianNameInput = input)}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
                placeholder="Guardian Name"
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
              <TextInput
                style={styles.input}
                onSubmitEditing={() => this.B2Cmobile2input.focus()}
                ref={input => (this.B2Cmobile1input = input)}
                autoCorrect={false}
                keyboardType="numeric"
                returnKeyType="next"
                placeholder="Mobile 1"
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
              <TextInput
                style={styles.input}
                onSubmitEditing={() => this.B2CschoolNameInput.focus()}
                ref={input => (this.B2Cmobile2input = input)}
                autoCorrect={false}
                keyboardType="numeric"
                returnKeyType="next"
                placeholder="Mobile 2"
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
              <View style={styles.flexColumn}>
                <NameText style={{ color: "#fff", fontSize: 24 }}>
                  Class
                </NameText>
                <RadioForm
                  radio_props={b2cClass_props}
                  initial={this.state.b2cClass}
                  onPress={value => {
                    this.setState({ b2cClass: value });
                  }}
                  formHorizontal={false}
                  labelHorizontal={true}
                  animation={true}
                  //buttonColor={"#fff"}
                  labelStyle={{ fontSize: 20, color: "#fff" }}
                  buttonSize={10}
                  buttonOuterSize={20}
                  style={{ marginTop: 5 }}
                />
              </View>
              <TextInput
                style={styles.input}
                autoCorrect={false}
                onSubmitEditing={() => this.B2CemailInput.focus()}
                ref={input => (this.B2CschoolNameInput = input)}
                keyboardType="default"
                returnKeyType="next"
                placeholder="School/College Name"
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
              <TextInput
                style={styles.input}
                onSubmitEditing={() => this.B2CaddressInput.focus()}
                ref={input => (this.B2CemailInput = input)}
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                placeholder="Email Address"
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
              <TextInput
                style={styles.input}
                multiline={true}
                autoCorrect={false}
                onSubmitEditing={() => this.B2CcityInput.focus()}
                ref={input => (this.B2CaddressInput = input)}
                keyboardType="default"
                returnKeyType="next"
                placeholder="Address"
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
              <TextInput
                style={styles.input}
                autoCorrect={false}
                onSubmitEditing={() => this.B2CstateInput.focus()}
                ref={input => (this.B2CcityInput = input)}
                keyboardType="default"
                returnKeyType="next"
                placeholder="City"
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
              <TextInput
                style={styles.input}
                autoCorrect={false}
                onSubmitEditing={() => this.B2CprincipalNameInput.focus()}
                ref={input => (this.B2CstateInput = input)}
                keyboardType="default"
                returnKeyType="next"
                placeholder="State"
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
              <View style={styles.flexColumn}>
                <NameText style={{ color: "#fff", fontSize: 24 }}>
                  Financial Status?
                </NameText>
                <RadioForm
                  radio_props={studentFinanceStatus_props}
                  initial={this.state.studentFinanceStatus}
                  onPress={value => {
                    this.setState({ studentFinanceStatus: value });
                  }}
                  formHorizontal={false}
                  labelHorizontal={true}
                  animation={true}
                  //buttonColor={"#fff"}
                  labelStyle={{ fontSize: 20, color: "#fff" }}
                  buttonSize={10}
                  buttonOuterSize={20}
                  style={{ marginTop: 5 }}
                />
              </View>
              <TextInput
                style={styles.input}
                autoCorrect={false}
                onSubmitEditing={() => this.B2CprincipalMobileInput.focus()}
                ref={input => (this.B2CprincipalNameInput = input)}
                keyboardType="default"
                returnKeyType="next"
                placeholder="Principal Name"
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
              <TextInput
                style={styles.input}
                //onSubmitEditing={() => this.schoolNameInput.focus()}
                ref={input => (this.B2CprincipalMobileInput = input)}
                autoCorrect={false}
                keyboardType="numeric"
                returnKeyType="next"
                placeholder="Mobile"
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
              <View style={styles.flexColumn}>
                <NameText style={{ color: "#fff", fontSize: 24 }}>
                  8,9,10 Foundation?
                </NameText>
                <RadioForm
                  radio_props={foundation_props}
                  initial={this.state.foundation}
                  onPress={value => {
                    this.setState({ foundation: value });
                  }}
                  formHorizontal={false}
                  labelHorizontal={true}
                  animation={true}
                  //buttonColor={"#fff"}
                  labelStyle={{ fontSize: 20, color: "#fff" }}
                  buttonSize={10}
                  buttonOuterSize={20}
                  style={{ marginTop: 5 }}
                />
                <NameText style={{ color: "#fff", fontSize: 24 }}>
                  Coaching
                </NameText>

                <CheckBox
                  title="CET"
                  checked={this.state.CETchecked}
                  onPress={() =>
                    this.setState({ CETchecked: !this.state.CETchecked })
                  }
                />
                <CheckBox
                  title="NEET"
                  checked={this.state.NEETchecked}
                  onPress={() =>
                    this.setState({ NEETchecked: !this.state.NEETchecked })
                  }
                />
                <CheckBox
                  title="IIT"
                  checked={this.state.IITchecked}
                  onPress={() =>
                    this.setState({ IITchecked: !this.state.IITchecked })
                  }
                />
                <CheckBox
                  title="Advanced"
                  checked={this.state.Advancedchecked}
                  onPress={() =>
                    this.setState({
                      Advancedchecked: !this.state.Advancedchecked
                    })
                  }
                />
              </View>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                  console.log("Button Pressed");
                }}
              >
                <Text style={styles.buttonText}>Add Lead</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",

    backgroundColor: "#031828",
    flexDirection: "column"
  },
  card: {
    backgroundColor: "#2c3e50",
    padding: 20,
    borderWidth: 1,
    borderColor: "#2F4F4F",
    margin: 10,
    flexDirection: "column",
    elevation: 4,
    borderRadius: 5
  },
  flexRow: {
    flex: 1,
    flexDirection: "row"
  },
  flexColumn: {
    flexDirection: "column",
    marginTop: 5,
    justifyContent: "center"
  },
  normalText: {
    color: "#fff"
  },
  input: {
    height: 50,
    backgroundColor: "rgba(225,225,225,0.2)",
    marginBottom: 10,
    padding: 10,
    fontSize: 20,
    color: "#fff"
  },
  multilineInput: {
    backgroundColor: "rgba(225,225,225,0.2)",
    marginBottom: 10,
    padding: 5,
    fontSize: 20,
    color: "#fff",
    flex: 1
  },
  buttonContainer: {
    backgroundColor: "#2980b6",
    paddingVertical: 15,
    marginTop: 10
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700"
  }
});
const ValueText = styled.Text`
  height: 25px;
  font-size: 20px;
  font-weight: 600;
  font-style: normal;
  text-align: center;
  color: rgba(3, 15, 41, 0.9);
`;
const NameText = styled.Text`
  height: 30px;
  font-size: 17px;
  font-weight: 400;
  font-style: normal;
  color: " rgba(3, 15, 41, 0.9)";
  text-align: center;
  flex: 1;
`;
