import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Linking,
  DatePickerAndroid,
  TimePickerAndroid
} from "react-native";
import styled from "styled-components";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";

var radio_props = [
  { label: "Verified", value: 0 },
  { label: "Unverified", value: 1 },
  { label: "Dead", value: 2 },
  { label: "Followup", value: 3 },
  { label: "Appointment Fixed", value: 4 },
  { label: "Appointment Done", value: 5 }
];
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

export default class ViewLead extends Component {
  state = {
    editable: false,
    leadType: 0,

    b2bschoolName: "My School Name",
    b2bCity: "Pune",
    b2bDistrict: "Pune",
    b2bState: "Maharastra",
    b2bPrincipalName: "Qwerty",
    b2bPrincipalMobile1: "987654321",
    b2bPrincipalMobile2: "9870654321",
    b2bPrincipalEmail: "iamprincipal@school.com",
    b2bContactPersonName: "Shyam",
    b2bContactPersonMobile: "1231231231",
    b2bClass12Strength: "200",
    b2bClass11Strength: "300",
    b2b11thFee: "5000",
    b2bClass10Strength: "300",
    b2b10thFee: "5000",
    b2bDecisionMakerName: "Rajesh",
    b2bDecisionMakerMobile: "4564564564",
    nextMeetDate: "03/11/19",
    nextMeetTime: "05:00 pm",
    b2bResidential: "No",
    b2b8910Foundation: "Yes",
    b2bInfrastructure: "Good",
    b2cStudentName: "Ravi",
    b2cGuardianName: "Mahesh Raj",
    b2cStudentMobile1: "1234567890",
    b2cStudentMobile2: "2342342390",
    b2cStudentClass: "8th",
    b2cStudentEmail: "iam@student.com",
    b2cSchoolName: "Allen",
    b2cSchoolEmail: "thisis@school.com",
    b2cSchoolAddress: "Swargate",
    b2cCity: "Pune",
    b2cState: "Maharastra",
    b2cFinancialStatus: "Poor",
    b2cPrincipalName: "Amitabh",
    b2cPrincipalMobile: "9998889989",
    b2c8910foundation: "Yes",
    b2cCoaching: "CET,IIT"
  };
  componentDidMount() {
    this.setState({
      name: this.props.navigation.getParam("name"),
      contactNumber: this.props.navigation.getParam("contact"),
      class: this.props.navigation.getParam("class"),
      address: this.props.navigation.getParam("address")
    });
  }
  pickDate = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date(this.state.nextMeetDate)
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
      var populateHour = 0,
        populateMinutes = 0;
      if (this.state.nextMeetTime.substring(6) == "pm") {
        populateHour = 12;
      }
      populateHour =
        populateHour + parseInt(this.state.nextMeetTime.substring(0, 2));

      populateMinutes = parseInt(this.state.nextMeetTime.substring(3, 5));
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: populateHour,
        minute: populateMinutes
        //is24Hour: false // Will display '2 PM'
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
        <ScrollView style={{ flex: 1, padding: 5 }}>
          <View style={styles.card}>
            <NameText>Select Status</NameText>
            <RadioForm
              radio_props={radio_props}
              initial={this.state.status}
              onPress={value => {
                this.setState({ status: value });
              }}
              formHorizontal={false}
              labelHorizontal={true}
              animation={false}
              //buttonColor={"#fff"}
              labelStyle={{ fontSize: 15, padding: 5 }}
              buttonSize={10}
              buttonOuterSize={20}
            />
            <TouchableOpacity style={styles.buttonContainer} onPress={() => {}}>
              <Text style={styles.buttonText}>SAVE CHANGES</Text>
            </TouchableOpacity>
          </View>
          {this.state.leadType == 0 && (
            <View style={styles.card}>
              <View style={styles.flexColumn}>
                <NameText>School Name</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2Bcity.focus()}
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2bschoolName}
                  onChangeText={text => {
                    this.setState({ b2bschoolName: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>City/Town</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2Bdistrict.focus()}
                  ref={input => (this.B2Bcity = input)}
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2bCity}
                  onChangeText={text => {
                    this.setState({ b2bCity: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>District</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2Bstate.focus()}
                  ref={input => (this.B2Bdistrict = input)}
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2bDistrict}
                  onChangeText={text => {
                    this.setState({ b2bDistrict: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>State</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2Bprincipal.focus()}
                  ref={input => (this.B2Bstate = input)}
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2bState}
                  onChangeText={text => {
                    this.setState({ b2bState: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Principal Name</NameText>
                <TextInput
                  style={styles.input}
                  autoCorrect={false}
                  onSubmitEditing={() => this.B2BprincipalMobile1.focus()}
                  ref={input => (this.B2Bprincipal = input)}
                  keyboardType="default"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2bPrincipalName}
                  onChangeText={text => {
                    this.setState({ b2bPrincipalName: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Principal Mobile1</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2BprincipalMobile2.focus()}
                  ref={input => (this.B2BprincipalMobile1 = input)}
                  autoCorrect={false}
                  keyboardType="numeric"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2bPrincipalMobile1}
                  onChangeText={text => {
                    this.setState({ b2bPrincipalMobile1: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Principal Mobile2</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2BprincipalEmail.focus()}
                  ref={input => (this.B2BprincipalMobile2 = input)}
                  autoCorrect={false}
                  keyboardType="numeric"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2bPrincipalMobile2}
                  onChangeText={text => {
                    this.setState({ b2bPrincipalMobile2: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Email</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2BcontactPerson.focus()}
                  ref={input => (this.B2BprincipalEmail = input)}
                  autoCorrect={false}
                  keyboardType="email-address"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2bPrincipalEmail}
                  onChangeText={text => {
                    this.setState({ b2bPrincipalEmail: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Contact Person</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2BcontactPersonMobile.focus()}
                  ref={input => (this.B2BcontactPerson = input)}
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2bContactPersonName}
                  onChangeText={text => {
                    this.setState({ b2bContactPersonName: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Contact Person Mobile</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2Bclass12Strength.focus()}
                  ref={input => (this.B2BcontactPersonMobile = input)}
                  autoCorrect={false}
                  keyboardType="numeric"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2bContactPersonMobile}
                  onChangeText={text => {
                    this.setState({ b2bContactPersonMobile: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>12th Class Strength</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2Bclass11Strength.focus()}
                  ref={input => (this.B2Bclass12Strength = input)}
                  autoCorrect={false}
                  keyboardType="numeric"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2bClass12Strength}
                  onChangeText={text => {
                    this.setState({ b2bClass12Strength: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>11th Class Strength</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2Bs11thFee.focus()}
                  ref={input => (this.B2Bclass11Strength = input)}
                  autoCorrect={false}
                  keyboardType="numeric"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2bClass11Strength}
                  onChangeText={text => {
                    this.setState({ b2bClass11Strength: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Fee</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2Bclass10Strength.focus()}
                  ref={input => (this.B2Bs11thFee = input)}
                  autoCorrect={false}
                  keyboardType="numeric"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2b11thFee}
                  onChangeText={text => {
                    this.setState({ b2b11thFee: text });
                  }}
                />
              </View>

              <View style={styles.flexColumn}>
                <NameText>10th Class Strength</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2Bs10thFee.focus()}
                  ref={input => (this.B2Bclass10Strength = input)}
                  autoCorrect={false}
                  keyboardType="numeric"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2bClass10Strength}
                  onChangeText={text => {
                    this.setState({ b2bClass10Strength: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Fee</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2BDecisionMaker.focus()}
                  ref={input => (this.B2Bs10thFee = input)}
                  autoCorrect={false}
                  keyboardType="numeric"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2b10thFee}
                  onChangeText={text => {
                    this.setState({ b2b10thFee: text });
                  }}
                />
              </View>

              <View style={styles.flexColumn}>
                <NameText>Decision Maker</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2BDecisionMakerMobile.focus()}
                  ref={input => (this.B2BDecisionMaker = input)}
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2bDecisionMakerName}
                  onChangeText={text => {
                    this.setState({ b2bDecisionMakerName: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Decision Maker Mobile</NameText>
                <TextInput
                  style={styles.input}
                  //onSubmitEditing={() => this.B2Bclass12Strength.focus()}
                  ref={input => (this.B2BDecisionMakerMobile = input)}
                  autoCorrect={false}
                  keyboardType="numeric"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2bDecisionMakerMobile}
                  onChangeText={text => {
                    this.setState({ b2bDecisionMakerMobile: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Next Meeting Date and Time</NameText>

                <TouchableOpacity
                  onPress={() => {
                    if (this.state.editable) this.pickDate();
                  }}
                  style={styles.input}
                >
                  <Text
                    style={{
                      color: "#fff",

                      fontSize: 20,
                      textAlign: "center"
                    }}
                  >
                    {this.state.nextMeetDate}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    if (this.state.editable) this.pickTime();
                  }}
                  style={styles.input}
                >
                  <Text
                    style={{
                      color: "#fff",

                      fontSize: 20,
                      textAlign: "center"
                    }}
                  >
                    {this.state.nextMeetTime}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.flexColumn}>
                <NameText>8,9,10 Foundation</NameText>
                {this.state.editable ? (
                  <RadioForm
                    radio_props={foundation_props}
                    initial={
                      foundation_props.find(item => {
                        if (item.label === this.state.b2b8910Foundation)
                          return item;
                      }).value
                    }
                    onPress={value => {
                      let temp = foundation_props.find(item => {
                        if (item.value === value) return item;
                      }).label;
                      this.setState({
                        b2b8910Foundation: temp
                      });
                    }}
                    formHorizontal={false}
                    labelHorizontal={true}
                    animation={false}
                    //buttonColor={"#fff"}
                    labelStyle={{ fontSize: 15, paddingLeft: 5 }}
                    buttonSize={10}
                    buttonOuterSize={20}
                  />
                ) : (
                  <TextInput
                    style={styles.input}
                    editable={false}
                    value={this.state.b2b8910Foundation}
                  />
                )}
              </View>
              <View style={styles.flexColumn}>
                <NameText>Residential Campus</NameText>
                {this.state.editable ? (
                  <RadioForm
                    radio_props={foundation_props}
                    initial={
                      foundation_props.find(item => {
                        if (item.label === this.state.b2bResidential)
                          return item;
                      }).value
                    }
                    formHorizontal={false}
                    labelHorizontal={true}
                    animation={false}
                    //buttonColor={"#fff"}
                    labelStyle={{ fontSize: 15, paddingLeft: 5 }}
                    buttonSize={10}
                    buttonOuterSize={20}
                    onPress={value => {
                      let temp = foundation_props.find(item => {
                        if (item.value === value) return item;
                      }).label;
                      this.setState({
                        b2bResidential: temp
                      });
                    }}
                  />
                ) : (
                  <TextInput
                    style={styles.input}
                    editable={false}
                    value={this.state.b2bResidential}
                  />
                )}
              </View>

              <View style={styles.flexColumn}>
                <NameText>Infrastructure</NameText>
                {this.state.editable ? (
                  <RadioForm
                    radio_props={infrastucture_props}
                    initial={
                      infrastucture_props.find(item => {
                        if (item.label == this.state.b2bInfrastructure)
                          return item;
                      }).value
                    }
                    onPress={value => {
                      let temp = infrastucture_props.find(item => {
                        if (item.value === value) return item;
                      }).label;
                      this.setState({
                        b2bInfrastructure: temp
                      });
                    }}
                    formHorizontal={true}
                    labelHorizontal={true}
                    animation={true}
                    //buttonColor={"#fff"}
                    labelStyle={{ fontSize: 15, padding: 5 }}
                    buttonSize={10}
                    buttonOuterSize={20}
                  />
                ) : (
                  <TextInput
                    style={styles.input}
                    editable={false}
                    value={this.state.b2bInfrastructure}
                  />
                )}
              </View>
              <View style={styles.flexRow}>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => {
                    this.setState({ editable: !this.state.editable });
                  }}
                >
                  {this.state.editable ? (
                    <Text style={styles.buttonText}>SAVE </Text>
                  ) : (
                    <Text style={styles.buttonText}>EDIT </Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => {
                    Linking.openURL("tel:" + this.state.b2bContactPersonMobile);
                  }}
                >
                  <Text style={styles.buttonText}>CALL</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {this.state.leadType == 1 && (
            <View style={styles.card}>
              <View style={styles.flexColumn}>
                <NameText>Student Name</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2CguardianNameInput.focus()}
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2cStudentName}
                  onChangeText={text => {
                    this.setState({ b2cStudentName: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Guardian Name</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2Cmobile1input.focus()}
                  ref={input => (this.B2CguardianNameInput = input)}
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2cGuardianName}
                  onChangeText={text => {
                    this.setState({ b2cGuardianName: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Mobile 1</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2Cmobile2input.focus()}
                  ref={input => (this.B2Cmobile1input = input)}
                  autoCorrect={false}
                  keyboardType="numeric"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2cStudentMobile1}
                  onChangeText={text => {
                    this.setState({ b2cStudentMobile1: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Mobile 2</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2CschoolNameInput.focus()}
                  ref={input => (this.B2Cmobile2input = input)}
                  autoCorrect={false}
                  keyboardType="numeric"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2cStudentMobile2}
                  onChangeText={text => {
                    this.setState({ b2cStudentMobile2: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Class</NameText>
                {this.state.editable ? (
                  <RadioForm
                    radio_props={b2cClass_props}
                    initial={
                      b2cClass_props.find(item => {
                        if (item.label === this.state.b2cStudentClass)
                          return item;
                      }).value
                    }
                    formHorizontal={false}
                    labelHorizontal={true}
                    animation={false}
                    //buttonColor={"#fff"}
                    labelStyle={{ fontSize: 15, paddingLeft: 5 }}
                    buttonSize={10}
                    buttonOuterSize={20}
                    onPress={value => {
                      let temp = b2cClass_props.find(item => {
                        if (item.value === value) return item;
                      }).label;
                      this.setState({
                        b2cStudentClass: temp
                      });
                    }}
                  />
                ) : (
                  <TextInput
                    style={styles.input}
                    editable={false}
                    value={this.state.b2cStudentClass}
                  />
                )}
              </View>
              <View style={styles.flexColumn}>
                <NameText>School/College Name</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2CemailInput.focus()}
                  ref={input => (this.B2CschoolNameInput = input)}
                  keyboardType="default"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2cSchoolName}
                  onChangeText={text => {
                    this.setState({ b2cSchoolName: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Email Address</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2CaddressInput.focus()}
                  ref={input => (this.B2CemailInput = input)}
                  autoCorrect={false}
                  keyboardType="email-address"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2cSchoolEmail}
                  onChangeText={text => {
                    this.setState({ b2cSchoolEmail: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Address</NameText>
                <TextInput
                  style={styles.input}
                  multiline={true}
                  autoCorrect={false}
                  onSubmitEditing={() => this.B2CcityInput.focus()}
                  ref={input => (this.B2CaddressInput = input)}
                  keyboardType="default"
                  editable={this.state.editable}
                  value={this.state.b2cSchoolAddress}
                  onChangeText={text => {
                    this.setState({ b2cSchoolAddress: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>City</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2CstateInput.focus()}
                  ref={input => (this.B2CcityInput = input)}
                  keyboardType="default"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2cCity}
                  onChangeText={text => {
                    this.setState({ b2cCity: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>State</NameText>
                <TextInput
                  style={styles.input}
                  autoCorrect={false}
                  onSubmitEditing={() => this.B2CprincipalNameInput.focus()}
                  ref={input => (this.B2CstateInput = input)}
                  keyboardType="default"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2cState}
                  onChangeText={text => {
                    this.setState({ b2cState: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Financial Status</NameText>
                {this.state.editable ? (
                  <RadioForm
                    radio_props={studentFinanceStatus_props}
                    initial={
                      studentFinanceStatus_props.find(item => {
                        if (item.label === this.state.b2cFinancialStatus)
                          return item;
                      }).value
                    }
                    formHorizontal={false}
                    labelHorizontal={true}
                    animation={false}
                    //buttonColor={"#fff"}
                    labelStyle={{ fontSize: 15, paddingLeft: 5 }}
                    buttonSize={10}
                    buttonOuterSize={20}
                    onPress={value => {
                      let temp = studentFinanceStatus_props.find(item => {
                        if (item.value === value) return item;
                      }).label;
                      this.setState({
                        b2cFinancialStatus: temp
                      });
                    }}
                  />
                ) : (
                  <TextInput
                    style={styles.input}
                    editable={false}
                    value={this.state.b2cFinancialStatus}
                  />
                )}
              </View>
              <View style={styles.flexColumn}>
                <NameText>Principal Name</NameText>
                <TextInput
                  style={styles.input}
                  onSubmitEditing={() => this.B2CprincipalMobileInput.focus()}
                  ref={input => (this.B2CprincipalNameInput = input)}
                  keyboardType="default"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2cPrincipalName}
                  onChangeText={text => {
                    this.setState({ b2cPrincipalName: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>Principal Mobile</NameText>
                <TextInput
                  style={styles.input}
                  ref={input => (this.B2CprincipalMobileInput = input)}
                  autoCorrect={false}
                  keyboardType="numeric"
                  returnKeyType="next"
                  editable={this.state.editable}
                  value={this.state.b2cPrincipalMobile}
                  onChangeText={text => {
                    this.setState({ b2cPrincipalMobile: text });
                  }}
                />
              </View>
              <View style={styles.flexColumn}>
                <NameText>8,9,10 Foundation</NameText>
                {this.state.editable ? (
                  <RadioForm
                    radio_props={foundation_props}
                    initial={
                      foundation_props.find(item => {
                        if (item.label === this.state.b2c8910foundation)
                          return item;
                      }).value
                    }
                    onPress={value => {
                      let temp = foundation_props.find(item => {
                        if (item.value === value) return item;
                      }).label;
                      this.setState({
                        b2c8910foundation: temp
                      });
                    }}
                    formHorizontal={false}
                    labelHorizontal={true}
                    animation={false}
                    //buttonColor={"#fff"}
                    labelStyle={{ fontSize: 15, paddingLeft: 5 }}
                    buttonSize={10}
                    buttonOuterSize={20}
                  />
                ) : (
                  <TextInput
                    style={styles.input}
                    editable={false}
                    value={this.state.b2c8910foundation}
                  />
                )}
              </View>
              <View style={styles.flexRow}>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => {
                    this.setState({ editable: !this.state.editable });
                  }}
                >
                  {this.state.editable ? (
                    <Text style={styles.buttonText}>SAVE </Text>
                  ) : (
                    <Text style={styles.buttonText}>EDIT </Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => {
                    Linking.openURL("tel:" + this.state.b2cStudentMobile1);
                  }}
                >
                  <Text style={styles.buttonText}>CALL</Text>
                </TouchableOpacity>
              </View>
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

  flexRow: {
    flexDirection: "row"
  },
  flexColumn: {
    flexDirection: "column",
    marginTop: 5,
    justifyContent: "center"
  },
  card: {
    backgroundColor: "#ced9e4",
    padding: 15,
    borderWidth: 1,
    borderColor: "#2F4F4F",
    margin: 10,
    flexDirection: "column",
    elevation: 4,
    flex: 1,
    borderRadius: 5
  },
  input: {
    height: 30,
    backgroundColor: "#2c3e50",
    marginBottom: 10,
    padding: 5,
    fontSize: 20,
    color: "#fff",
    flex: 1
  },
  multilineInput: {
    backgroundColor: "#2c3e50",
    marginBottom: 10,
    padding: 5,
    fontSize: 20,
    color: "#fff",
    flex: 1
  },
  buttonContainer: {
    backgroundColor: "#2980b6",
    paddingVertical: 15,
    flex: 1,
    margin: 10
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700"
  }
});
const NameText = styled.Text`
  height: 25px;
  font-size: 17px;
  font-weight: 300;
  font-style: normal;
  color: rgba(3, 15, 41, 0.9);
  text-align: center;
  flex: 0.7;
`;
