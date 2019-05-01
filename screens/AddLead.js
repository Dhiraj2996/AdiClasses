import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  DatePickerAndroid,
  TimePickerAndroid,
  Alert,
  AsyncStorage
} from "react-native";
import styled from "styled-components";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import { CheckBox } from "react-native-elements";
import { AddB2BLead, AddB2CLead } from "../assests/ApiUrl";

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
    loginID: "",

    CETchecked: false,
    NEETchecked: false,
    IITchecked: false,
    Advancedchecked: false,

    b2bschoolName: "",
    b2bCity: "",
    b2bDistrict: "",
    b2bState: "",
    b2bPrincipalName: "",
    b2bPrincipalMobile1: "",
    b2bPrincipalMobile2: "",
    b2bPrincipalEmail: "",
    b2bContactPersonName: "",
    b2bContactPersonMobile: "",
    b2bClass12Strength: "",
    b2bClass11Strength: "",
    b2b11thFee: "",
    b2bClass10Strength: "",
    b2b10thFee: "",
    b2bDecisionMakerName: "",
    b2bDecisionMakerMobile: "",
    nextMeetDate: "",
    nextMeetTime: "",
    b2bResidential: 0,
    b2b8910Foundation: 0,
    b2bInfrastructure: 0,
    b2bRemarks: "",

    b2cStudentName: "",
    b2cGuardianName: "",
    b2cStudentMobile1: "",
    b2cStudentMobile2: "",
    b2cStudentClass: 0,
    b2cStudentEmail: "",
    b2cSchoolName: "",
    b2cSchoolEmail: "",
    b2cSchoolAddress: "",
    b2cCity: "",
    b2cState: "",
    b2cFinancialStatus: 0,
    b2cPrincipalName: "",
    b2cPrincipalMobile: "",
    b2c8910foundation: 0,
    b2cCoaching: "",
    b2cRemarks: ""
  };

  componentDidMount = () => {
    this._retrieveData();
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

        let tempMinutes = "" + minute;
        let tempHour = "" + hour;
        if (parseInt(minute) < 10) {
          tempMinutes = "0" + tempMinutes;
        }
        if (parseInt(hour) >= 12) {
          tempHour = parseInt(hour) - 12;
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
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("userId");
      this.setState({ loginID: value });
    } catch (error) {
      console.log(error);
    }
  };
  AddB2BLeadAPI = () => {
    console.log("In Addb2bLeadApi");
    fetch(AddB2BLead, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        school: this.state.b2bschoolName,
        city: this.state.b2bCity,
        districtName: this.state.b2bDistrict,
        state: this.state.b2bState,
        principleName: this.state.b2bPrincipalName,
        mobile1: this.state.b2bPrincipalMobile1,
        mobile2: this.state.b2bPrincipalMobile2,
        email: this.state.b2bPrincipalEmail,
        contactPersonName: this.state.b2bContactPersonName,
        mobile: this.state.b2bContactPersonMobile,
        strength11: this.state.b2bClass11Strength,
        strength12: this.state.b2bClass12Strength,
        fee11: this.state.b2b11thFee,
        fee10: this.state.b2b10thFee,
        strength10: this.state.b2bClass10Strength,
        decesionMakerName: this.state.b2bDecisionMakerName,
        decesionMakerNumber: this.state.b2bDecisionMakerMobile,
        meetingDate: this.state.nextMeetDate,
        meetingTime: this.state.nextMeetTime,
        residentialCampus: foundation_props.find(item => {
          if (item.value === this.state.b2bResidential) return item;
        }).label,
        foundation8910: foundation_props.find(item => {
          if (item.value === this.state.b2b8910Foundation) return item;
        }).label,
        infrastructure: infrastucture_props.find(item => {
          if (item.value === this.state.b2bInfrastructure) return item;
        }).label,
        remark: this.state.b2bRemarks,
        loginID: this.state.loginID
      })
    })
      .then(data => {
        return data.json();
      })
      .then(data => {
        console.log("AddLead Response", data);

        if (data.message == "Lead Added") {
          //this._storeData(data.userId);
          Alert.alert("Lead Added Successfully");
          this.props.navigation.navigate("DashBoard");
        } else if (data.message) {
          Alert.alert("Invalid Username or Password");
        }
      })
      .catch(error => {
        console.log("Api call error");
        console.log(error.message);
      });
  };

  CallAddB2BLead = () => {
    //Provide check for field validations here
    if (this.state.b2bschoolName == "") {
      Alert.alert("Please fill all Fields!");
    }
    this.AddB2BLeadAPI();
  };

  AddB2CLeadAPI = varcoaching => {
    console.log("In Addb2cLeadApi");
    fetch(AddB2CLead, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        loginID: this.state.loginID,
        studentName: this.state.b2cStudentName,
        gaurdianName: this.state.b2cGuardianName,
        mobile1: this.state.b2cStudentMobile1,
        mobile2: this.state.b2cStudentMobile2,
        divisionClass: b2cClass_props.find(item => {
          if (item.value === this.state.b2cStudentClass) return item;
        }).label,
        schoolOrCollege: this.state.b2cSchoolName,
        email: this.state.b2cSchoolEmail,
        address: this.state.b2cSchoolAddress,
        city: this.state.b2cCity,
        state: this.state.b2cState,
        financialStatus: studentFinanceStatus_props.find(item => {
          if (item.value === this.state.b2cFinancialStatus) return item;
        }).label,
        principalName: this.state.b2cPrincipalName,
        mobile: this.state.b2cPrincipalMobile,
        coaching: varcoaching,
        foundation8910: foundation_props.find(item => {
          if (item.value === this.state.b2c8910foundation) return item;
        }).label,
        remark: this.state.b2cRemarks
      })
    })
      .then(data => {
        return data.json();
      })
      .then(data => {
        //console.log("AddLead Response", data);

        if (data.message == "Lead Added") {
          //this._storeData(data.userId);
          Alert.alert("Lead Added Successfully");
          //this.props.navigation.navigate("DashBoard");
        } else if (data.message) {
          Alert.alert(data.message);
        }
      })
      .catch(error => {
        console.log("Api call error");
        console.log(error.message);
      });
  };

  CallAddB2CLead = () => {
    let tempCoaching = "";
    if (this.state.CETchecked) {
      tempCoaching += "CET,";
    }
    if (this.state.NEETchecked) {
      tempCoaching = "NEET,";
    }
    if (this.state.IITchecked) {
      tempCoaching += "IIT,";
    }
    if (this.state.Advancedchecked) {
      tempCoaching += "Advanced,";
    }

    this.setState({ b2cCoaching: tempCoaching });
    this.AddB2CLeadAPI(tempCoaching);
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
                onChangeText={text => this.setState({ b2bschoolName: text })}
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
                onChangeText={text => this.setState({ b2bCity: text })}
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
                onChangeText={text => this.setState({ b2bDistrict: text })}
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
                onChangeText={text => this.setState({ b2bState: text })}
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
                onChangeText={text => this.setState({ b2bPrincipalName: text })}
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
                onChangeText={text =>
                  this.setState({ b2bPrincipalMobile1: text })
                }
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
                onChangeText={text =>
                  this.setState({ b2bPrincipalMobile2: text })
                }
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
                onChangeText={text =>
                  this.setState({ b2bPrincipalEmail: text })
                }
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
                onChangeText={text =>
                  this.setState({ b2bContactPersonName: text })
                }
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
                onChangeText={text =>
                  this.setState({ b2bContactPersonMobile: text })
                }
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
                onChangeText={text =>
                  this.setState({ b2bClass12Strength: text })
                }
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
                onChangeText={text =>
                  this.setState({ b2bClass12Strength: text })
                }
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
                onChangeText={text => this.setState({ b2b11thFee: text })}
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
                onChangeText={text =>
                  this.setState({ b2bClass10Strength: text })
                }
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
                onChangeText={text => this.setState({ b2b10thFee: text })}
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
                onChangeText={text =>
                  this.setState({ b2bDecisionMakerName: text })
                }
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
                onChangeText={text =>
                  this.setState({ b2bDecisionMakerMobile: text })
                }
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
                  initial={this.state.b2bResidential}
                  onPress={value => {
                    this.setState({ b2bResidential: value });
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
                  initial={this.state.b2b8910Foundation}
                  onPress={value => {
                    this.setState({ b2b8910Foundation: value });
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
                  initial={this.state.b2bInfrastructure}
                  onPress={value => {
                    this.setState({ b2bInfrastructure: value });
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
                  onChangeText={text => this.setState({ b2bRemarks: text })}
                />
              </View>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => this.CallAddB2BLead()}
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
                onChangeText={text => {
                  this.setState({ b2cStudentName: text });
                }}
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
                onChangeText={text => {
                  this.setState({ b2cGuardianName: text });
                }}
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
                onChangeText={text => {
                  this.setState({ b2cStudentMobile1: text });
                }}
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
                onChangeText={text => {
                  this.setState({ b2cStudentMobile2: text });
                }}
              />
              <View style={styles.flexColumn}>
                <NameText style={{ color: "#fff", fontSize: 24 }}>
                  Class
                </NameText>
                <RadioForm
                  radio_props={b2cClass_props}
                  initial={this.state.b2cStudentClass}
                  onPress={value => {
                    this.setState({ b2cStudentClass: value });
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
                onChangeText={text => {
                  this.setState({ b2cSchoolName: text });
                }}
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
                onChangeText={text => {
                  this.setState({ b2cSchoolEmail: text });
                }}
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
                onChangeText={text => {
                  this.setState({ b2cSchoolAddress: text });
                }}
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
                onChangeText={text => {
                  this.setState({ b2cCity: text });
                }}
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
                onChangeText={text => {
                  this.setState({ b2cState: text });
                }}
              />
              <View style={styles.flexColumn}>
                <NameText style={{ color: "#fff", fontSize: 24 }}>
                  Financial Status?
                </NameText>
                <RadioForm
                  radio_props={studentFinanceStatus_props}
                  initial={this.state.b2cFinancialStatus}
                  onPress={value => {
                    this.setState({ b2cFinancialStatus: value });
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
                onChangeText={text => {
                  this.setState({ b2cPrincipalName: text });
                }}
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
                onChangeText={text => {
                  this.setState({ b2cPrincipalMobile: text });
                }}
              />
              <View style={styles.flexColumn}>
                <NameText style={{ color: "#fff", fontSize: 24 }}>
                  8,9,10 Foundation?
                </NameText>
                <RadioForm
                  radio_props={foundation_props}
                  initial={this.state.b2c8910foundation}
                  onPress={value => {
                    this.setState({ b2c8910foundation: value });
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
                  onChangeText={text => this.setState({ b2cRemarks: text })}
                />
              </View>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => this.CallAddB2CLead()}
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
