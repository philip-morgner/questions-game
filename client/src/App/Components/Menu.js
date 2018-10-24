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
import Main from "./Main";
import AddQuestionUI from "./AddQuestionUI";

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

export default class Menu extends React.Component<Props, State> {
  onForward = (component: Object) => () => {
    this.props.navigator.push({
      component,
      title: "Title",
    });
  };

  renderMenuButton = ({ title, component }: Object, index: number) => {
    return (
      // <TouchableHighlight
      //   key={index}
      //   style={{
      //     marginTop: 10,
      //     width: "80%",
      //     backgroundColor: "lightblue",
      //     alignItems: "center",
      //     padding: 10,
      //   }}
      // onPress={this.onForward(component)}>
      <Button
        onPress={this.onForward(component)}
        key={index}
        title={title}
        style={{
          marginTop: 10,
          width: "80%",
          backgroundColor: "lightblue",
          alignItems: "center",
          padding: 10,
        }}
      />
      // </TouchableHighlight>
    );
  };

  render() {
    const menuOptions = [{ title: "Start the Game", component: Main }];
    return (
      <View style={pageStyle.text}>
        {menuOptions.map(({ title, component }, i) =>
          this.renderMenuButton({ title, component }, i)
        )}
      </View>
    );
  }
}
