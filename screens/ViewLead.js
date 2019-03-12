import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Linking
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
export default class ViewLead extends Component {
  state = {
    editable: false,
    editRemark: false,
    name: "",
    contactNumber: "",
    class: "",
    address: "",
    status: 0,
    strength: "",
    scholar: 0,
    foundation: 0,
    infrastructure: 0,
    decisionMaker: ""
  };
  componentDidMount() {
    this.setState({
      name: this.props.navigation.getParam("name"),
      contactNumber: this.props.navigation.getParam("contact"),
      class: this.props.navigation.getParam("class"),
      address: this.props.navigation.getParam("address")
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1, padding: 5 }}>
          <View style={styles.card}>
            <View style={styles.flexRow}>
              <NameText>Name</NameText>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
                value={this.state.name}
                editable={this.state.editable}
                onChangeText={text => {
                  this.setState({ name: text });
                }}
              />
            </View>
            <View style={styles.flexRow}>
              <NameText>Contact Number</NameText>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
                value={this.state.contactNumber}
                editable={this.state.editable}
                onChangeText={text => {
                  this.setState({ contactNumber: text });
                }}
              />
            </View>
            <View style={styles.flexRow}>
              <NameText>Class</NameText>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
                value={this.state.class}
                editable={this.state.editable}
                onChangeText={text => {
                  this.setState({ class: text });
                }}
              />
            </View>
            <View style={styles.flexRow}>
              <NameText>Address</NameText>
              <TextInput
                style={styles.multilineInput}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
                value={this.state.address}
                editable={this.state.editable}
                multiline={true}
                onChangeText={text => {
                  this.setState({ address: text });
                }}
              />
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
                  Linking.openURL("tel:" + this.state.contactNumber);
                }}
              >
                <Text style={styles.buttonText}>CALL</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.card}>
            <NameText style={{ fontSize: 20, height: 30 }}>REMARKS</NameText>
            <View style={{ height: 10 }} />
            <View style={styles.flexRow}>
              <NameText>Strength</NameText>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
                value={this.state.strength}
                editable={this.state.editRemark}
                onChangeText={text => {
                  this.setState({ strength: text });
                }}
              />
            </View>

            <View style={styles.flexColumn}>
              <RadioForm
                radio_props={scholar_props}
                initial={this.state.scholar}
                onPress={value => {
                  this.setState({ scholar: value });
                }}
                formHorizontal={true}
                labelHorizontal={true}
                animation={true}
                //buttonColor={"#fff"}
                labelStyle={{ fontSize: 15, padding: 5 }}
                buttonSize={10}
                buttonOuterSize={20}
              />
            </View>
            <View style={styles.flexColumn}>
              <NameText>8,9,10 Foundation?</NameText>
              <RadioForm
                radio_props={foundation_props}
                initial={this.state.foundation}
                onPress={value => {
                  this.setState({ foundation: value });
                }}
                formHorizontal={true}
                labelHorizontal={true}
                animation={true}
                //buttonColor={"#fff"}
                labelStyle={{ fontSize: 15, padding: 5 }}
                buttonSize={10}
                buttonOuterSize={20}
              />
            </View>
            <View style={styles.flexColumn}>
              <NameText>Infrastructure</NameText>
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
                labelStyle={{ fontSize: 15, padding: 5 }}
                buttonSize={10}
                buttonOuterSize={20}
              />
            </View>

            <View style={styles.flexColumn}>
              <NameText>Decision Maker Name</NameText>
              <TextInput
                style={styles.multilineInput}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
                value={this.state.decisionMaker}
                editable={this.state.editRemark}
                multiline={true}
                onChangeText={text => {
                  this.setState({ decisionMaker: text });
                }}
              />
            </View>
            <View style={styles.flexRow}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                  this.setState({ editRemark: !this.state.editRemark });
                }}
              >
                {this.state.editRemark ? (
                  <Text style={styles.buttonText}>SAVE </Text>
                ) : (
                  <Text style={styles.buttonText}>EDIT </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
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
              animation={true}
              //buttonColor={"#fff"}
              labelStyle={{ fontSize: 15, padding: 5 }}
              buttonSize={10}
              buttonOuterSize={20}
            />
            <TouchableOpacity style={styles.buttonContainer} onPress={() => {}}>
              <Text style={styles.buttonText}>SAVE CHANGES</Text>
            </TouchableOpacity>
          </View>
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
