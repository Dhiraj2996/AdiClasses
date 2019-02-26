import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  ScrollView,
  TextInput
} from "react-native";
import styled from "styled-components";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";

var radio_props = [{ label: "B2B", value: 0 }, { label: "B2C", value: 1 }];

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
export default class AddLead extends Component {
  state = {
    value: 0,
    strength: "",
    scholar: 0,
    foundation: 0,
    infrastructure: 0,
    decisionMaker: ""
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{ marginBottom: 10 }}>
          <View style={styles.card}>
            <RadioForm
              radio_props={radio_props}
              initial={this.state.value}
              onPress={value => {
                this.setState({ value: value });
              }}
              formHorizontal={true}
              labelHorizontal={true}
              animation={true}
              //buttonColor={"#fff"}
              labelStyle={{ fontSize: 20, padding: 10, color: "#fff" }}
            />
          </View>
          {this.state.value == 0 && (
            <View style={styles.card}>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                onSubmitEditing={() => this.passwordInput.focus()}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
                placeholder="School/College Name"
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
                placeholder="City/District Name"
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
                placeholder="State"
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
            </View>
          )}
          {this.state.value == 1 && (
            <View style={styles.card}>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                onSubmitEditing={() => this.passwordInput.focus()}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
                placeholder="Customer Name"
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
                placeholder="City/District Name"
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
                placeholder="State"
                placeholderTextColor="rgba(225,225,225,0.7)"
              />
            </View>
          )}
          <View style={styles.card}>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              returnKeyType="next"
              placeholder="Admin Name"
              placeholderTextColor="rgba(225,225,225,0.7)"
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              returnKeyType="next"
              placeholder="Strength"
              placeholderTextColor="rgba(225,225,225,0.7)"
            />
            <RadioForm
              radio_props={scholar_props}
              initial={this.state.scholar}
              onPress={value => {
                this.setState({ scholar: value });
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
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                console.log("Button Pressed");
              }}
            >
              <Text style={styles.buttonText}>Add Lead</Text>
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
  height: 22px;
  font-size: 17px;
  font-weight: 400;
  font-style: normal;
  color: " rgba(3, 15, 41, 0.9)";
  text-align: center;
  flex: 1;
`;
