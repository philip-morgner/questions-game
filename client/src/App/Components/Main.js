// @flow

import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import Question from "./Questions";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#48BBEC",
    alignItems: "center",
    justifyContent: "center",
  },
});

type Q = {
  [string]: string,
};

type Props = {
  questions: Array<Q>,
};

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
    console.log(index);
    this.setState({ index });
  };

  render() {
    const { index } = this.state;
    return (
      <TouchableHighlight onPress={this.handlePress}>
        <View style={styles.mainContainer}>
          <Question index={index} />
        </View>
      </TouchableHighlight>
    );
  }
}
