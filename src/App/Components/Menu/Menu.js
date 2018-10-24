// @flow
import PropTypes from "prop-types";
import React from "react";
import {
  StyleSheet,
  NavigatorIOS,
  Text,
  View,
  Button,
  TouchableHighlight,
} from "react-native";
import NavButton from "./NavButton";
import Main from "../Main";

const pageStyle = StyleSheet.create({
  text: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
});

type Props = {
  route: {
    title: string,
  },
  navigator: Object,
};

type State = {};

export default class App extends React.Component<Props, State> {
  // make prop option: Object for nav
  onForward = () => {
    this.props.navigator.push({
      component: Main,
      title: "Main",
    });
  };

  renderMenuButton = (option: string, index: number) => {
    return (
      <TouchableHighlight
        key={index}
        style={{
          marginTop: 10,
          width: "80%",
          backgroundColor: "lightblue",
          alignItems: "center",
          padding: 10,
        }}
        color="aqua"
        onPress={this.onForward}>
        <Text>{option}</Text>
      </TouchableHighlight>
    );
  };

  render() {
    const menuOptions = ["start game", "add questions", "settings"];
    return (
      <View style={pageStyle.text}>
        {menuOptions.map((option, i) => this.renderMenuButton(option, i))}
      </View>
    );
  }

  // render() {
  //   const { navigator } = this.props;
  //   return <NavButton title="Main" color="aqua" navigator={navigator} />;
  // }
}
