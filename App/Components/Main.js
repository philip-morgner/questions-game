// @flow

import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Question from "./Question";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#48BBEC",
    alignItems: "center",
    justifyContent: "center",
    // flexDirection: 'column',
    // marginTop: 65,
  },
});

// type Question = {
//   [string]: string,
// };

// type Props = {
//   questions: Array<Question>,
// };

// type State = {
//   index: number,
// };

export default class Main extends React.Component {
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
      <TouchableWithoutFeedback onPress={this.handlePress}>
        <View style={styles.mainContainer}>
          <Question index={index} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
