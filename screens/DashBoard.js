import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Alert,
  AsyncStorage
} from "react-native";
import styled from "styled-components";
import { GetB2BList, GetB2CList } from "../assests/ApiUrl";
import { StackActions, NavigationActions } from "react-navigation";

b2bUnverified = [];
b2bVerified = [];
b2bDead = [];
b2bFollowup = [];
b2bAppointmentFixed = [];
b2bAppointmentDone = [];

b2cUnverified = [];
b2cVerified = [];
b2cDead = [];
b2cFollowup = [];
b2cAppointmentFixed = [];
b2cAppointmentDone = [];

export default class DashBoard extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Hi," + navigation.getParam("userName") + "!",
      headerRight: (
        <Button
          onPress={navigation.getParam("handleLogout")}
          title="LogOut"
          color="#444"
        />
      )
    };
  };
  state = {
    verifiedCount: 0,
    unverifiedCount: 0,
    deadCount: 0,
    followupCount: 0,
    appointmentFixedCount: 0,
    appointmentDoneCount: 0,
    userId: ""
  };

  componentDidMount = async () => {
    this.props.navigation.setParams({ handleLogout: this.handleLogout });
    const value = await AsyncStorage.getItem("userId");
    console.log("UserId:" + value);
    this.setState({ userId: value });
    this.refreshDashBoard(value);
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => this.refreshDashBoard(this.state.userId)
    );
  };
  refreshDashBoard = value => {
    this.getB2BListAPI(value);
    this.getB2CListAPI(value);
  };
  getB2BListAPI = userId => {
    fetch(GetB2BList, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        loginId: userId
      })
    })
      .then(data => {
        return data.json();
      })
      .then(data => {
        // console.log("B2BList:", data);

        if (data.message == "Data available") {
          //this._storeData(data.userId);
          console.log(data.message);
          b2bUnverified = data.records.filter(lead => {
            if (lead.status == "unverified") return lead;
          });
          b2bVerified = data.records.filter(lead => {
            if (lead.status == "verified") return lead;
          });
          b2bDead = data.records.filter(lead => {
            if (lead.status == "dead") return lead;
          });
          b2bFollowup = data.records.filter(lead => {
            if (lead.status == "followup") return lead;
          });
          b2bAppointmentFixed = data.records.filter(lead => {
            if (lead.status == "appointment fixed") return lead;
          });
          b2bAppointmentDone = data.records.filter(lead => {
            if (lead.status == "appointment done") return lead;
          });

          this.setCount();
        } else if (data.message) {
          console.log(data.message);
        }
      })
      .catch(error => {
        console.log("Api call error");
        console.log(error.message);
      });
  };
  getB2CListAPI = userId => {
    fetch(GetB2CList, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        loginId: userId
      })
    })
      .then(data => {
        return data.json();
      })
      .then(data => {
        //  console.log("B2CList:", data);

        if (data.message == "Data available") {
          //this._storeData(data.userId);
          console.log(data.message);
          b2cUnverified = data.records.filter(lead => {
            if (lead.status == "unverified") return lead;
          });
          b2cVerified = data.records.filter(lead => {
            if (lead.status == "verified") return lead;
          });
          b2cDead = data.records.filter(lead => {
            if (lead.status == "followup") return lead;
          });
          b2cFollowup = data.records.filter(lead => {
            if (lead.status == "appointment fixed") return lead;
          });
          b2cAppointmentFixed = data.records.filter(lead => {
            if (lead.status == "appointment fixed") return lead;
          });
          b2cAppointmentDone = data.records.filter(lead => {
            if (lead.status == "appointment done") return lead;
          });
          this.setCount();
        } else if (data.message) {
          console.log(data.message);
        }
      })
      .catch(error => {
        console.log("Api call error");
        console.log(error.message);
      });
  };
  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }
  setCount = () => {
    this.setState({
      verifiedCount: b2bVerified.length + b2cVerified.length,
      unverifiedCount: b2bUnverified.length + b2cUnverified.length,
      deadCount: b2bDead.length + b2cDead.length,
      followupCount: b2bFollowup.length + b2cFollowup.length,
      appointmentFixedCount:
        b2bAppointmentFixed.length + b2cAppointmentFixed.length,
      appointmentDoneCount:
        b2bAppointmentDone.length + b2cAppointmentDone.length
    });
  };
  handleLogout = async () => {
    await AsyncStorage.clear();
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Login" })]
    });
    this.props.navigation.dispatch(resetAction);
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.flexRow}>
          <DashBoardCard
            label="UNVERIFIED"
            value={this.state.unverifiedCount}
            navigation={this.props.navigation}
            datalist={b2bUnverified.concat(b2cUnverified)}
          />
          <DashBoardCard
            label="VERIFIED"
            value={this.state.verifiedCount}
            navigation={this.props.navigation}
            datalist={b2bVerified.concat(b2cVerified)}
          />
        </View>
        <View style={styles.flexRow}>
          <DashBoardCard
            label="DEAD"
            value={this.state.deadCount}
            navigation={this.props.navigation}
            datalist={b2bDead.concat(b2cDead)}
          />
          <DashBoardCard
            label="FOLLOW-UP"
            value={this.state.followupCount}
            navigation={this.props.navigation}
            datalist={b2bFollowup.concat(b2cFollowup)}
          />
        </View>
        <View style={styles.flexRow}>
          <DashBoardCard
            label="Appointment Fixed"
            value={this.state.appointmentFixedCount}
            navigation={this.props.navigation}
            datalist={b2bAppointmentFixed.concat(b2cAppointmentFixed)}
          />
          <DashBoardCard
            label="Appointment Done"
            value={this.state.appointmentDoneCount}
            navigation={this.props.navigation}
            datalist={b2bAppointmentDone.concat(b2cAppointmentDone)}
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
          //console.log("this.props.datalist: " + this.props.datalist);
          //this.props.datalist.map(item => console.log(item));
          this.props.navigation.navigate("StatusList", {
            pageTitle: this.props.label,
            datalist: this.props.datalist
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
    padding: 10,
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
  font-size: 25px;
  font-weight: 600;
  font-style: normal;
  text-align: center;
  color: rgba(3, 15, 41, 0.9);
  flex: 0.7;
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
