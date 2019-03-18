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
  state = {
    datalist: []
  };
  componentDidMount = () => {
    this.setState({ datalist: this.props.navigation.getParam("datalist") });
    console.log("CheckPoint1:");
    //this.props.navigation.getParam("datalist").map(item => console.log(item));
    //console.log(this.state.datalist);
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          {/* <ListCard
            name="Ujwal Tale"
            contact="7776661118"
            class="12th Class"
            address="Model Coloney,Pune"
            navigation={this.props.navigation}
          />
          
          
          <ListCard
            name="Ujwal Tale"
            contact="7776661118"
            class="12th Class"
            address="Model Coloney,Pune"
            navigation={this.props.navigation}
          /> */}
          {this.state.datalist &&
            this.state.datalist.map((item, index) => {
              if (item.school) {
                //this is b2b lead
                return (
                  <ListCard
                    key={index}
                    name={item.school}
                    contact={item.mobile1}
                    class={item.city}
                    address={item.state}
                    navigation={this.props.navigation}
                    leadtype="0"
                    dataItem={item}
                  />
                );
              } else {
                //this is b2c lead
                return (
                  <ListCard
                    key={index}
                    name={item.studentName}
                    contact={item.mobile1}
                    class={item.divisionClass}
                    address={item.city + "," + item.state}
                    navigation={this.props.navigation}
                    leadtype="1"
                    dataItem={item}
                  />
                );
              }
            })}
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
            dataItem: this.props.dataItem,
            leadtype: this.props.leadtype
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
