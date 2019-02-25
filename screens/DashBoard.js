import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Alert
} from "react-native";
import styled from "styled-components";

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: "DashBoard",
    headerRight: (
      <Button
        onPress={() => alert("This is a button!")}
        title="LogOut"
        color="#444"
      />
    )
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.flexRow}>
          <DashBoardCard
            label="VERIFIED"
            value={5}
            navigation={this.props.navigation}
          />
          <DashBoardCard
            label="UNVERIFIED"
            value={10}
            navigation={this.props.navigation}
          />
        </View>
        <View style={styles.flexRow}>
          <DashBoardCard
            label="DEAD"
            value={2}
            navigation={this.props.navigation}
          />
          <DashBoardCard
            label="FOLLOW-UP"
            value={3}
            navigation={this.props.navigation}
          />
        </View>
        <View style={styles.flexRow}>
          <DashBoardCard
            label="Appointment Fixed"
            value={5}
            navigation={this.props.navigation}
          />
          <DashBoardCard
            label="Appointment Done"
            value={10}
            navigation={this.props.navigation}
          />
        </View>
        <View style={{ flex: 0.5 }} />
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("AddLead");
          }}
          style={styles.fab}
        >
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class DashBoardCard extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          this.props.navigation.navigate("StatusList", {
            pageTitle: this.props.label
          });
        }}
      >
        <NameText style={{ flexWrap: "wrap" }}>{this.props.label}</NameText>
        <ValueText>{this.props.value}</ValueText>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
    flexDirection: "column"
  },
  card: {
    backgroundColor: "#ced9e4",
    padding: 20,
    borderWidth: 1,
    borderColor: "#2F4F4F",
    margin: 20,
    flexDirection: "column",
    elevation: 4,
    flex: 1,
    borderRadius: 5
  },
  flexRow: {
    flex: 1,
    flexDirection: "row"
  },
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "#03A9F4",
    borderRadius: 30,
    elevation: 8
  },
  fabIcon: {
    fontSize: 40,
    color: "white"
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
  font-weight: 600;
  font-style: normal;
  color: rgba(3, 15, 41, 0.9);
  text-align: center;
  flex: 1;
`;
