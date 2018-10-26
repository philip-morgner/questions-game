// @flow

import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Question from "./Question";

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#48BBEC",
    alignItems: "center",
    justifyContent: "center",
  },
});

type Props = {};

type State = {
  index: number,
};

export default class Main extends React.Component<Props, State> {
  state = {
    index: 0,
  };

  handlePress = () => {
    // make better random question pattern
    const index = Math.floor(Math.random() * 6);
    this.setState({ index });
  };

  render() {
    const { index } = this.state;
    return (
      <TouchableWithoutFeedback onPress={this.handlePress}>
        <View style={styles.page}>
          <Question index={index} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
