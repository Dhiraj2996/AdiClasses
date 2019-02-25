import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";
import styled from "styled-components";

export default class StatusList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("pageTitle")
    };
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <ListCard
            name="Ujwal Tale"
            contact="7776661118"
            class="12th Class"
            address="Model Coloney,Pune"
            navigation={this.props.navigation}
          />
          <ListCard
            name="Raj Malhotra"
            contact="7776661118"
            class="11th Class"
            address="Mumbai"
            navigation={this.props.navigation}
          />
          <ListCard
            name="Dinesh"
            contact="7776661118"
            class="7th Class"
            address="Pune"
            navigation={this.props.navigation}
          />
          <ListCard
            name="Ujwal Tale"
            contact="7776661118"
            class="12th Class"
            address="Model Coloney,Pune"
            navigation={this.props.navigation}
          />
        </ScrollView>
      </View>
    );
  }
}

class ListCard extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          console.log("card clicked");
          this.props.navigation.navigate("ViewLead", {
            name: this.props.name,
            contact: this.props.contact,
            class: this.props.class,
            address: this.props.address
          });
        }}
      >
        <NameText style={{ flexWrap: "wrap" }}>{this.props.name}</NameText>
        <NameText style={{ flexWrap: "wrap" }}>{this.props.contact}</NameText>
        <NameText style={{ flexWrap: "wrap" }}>{this.props.class}</NameText>
        <NameText style={{ flexWrap: "wrap" }}>{this.props.address}</NameText>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",

    backgroundColor: "#2c3e50",
    flexDirection: "column"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
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
  }
});
const NameText = styled.Text`
  height: 20px;
  font-size: 17px;
  font-weight: 300;
  font-style: normal;
  color: rgba(3, 15, 41, 0.9);
  text-align: center;
  flex: 1;
`;
