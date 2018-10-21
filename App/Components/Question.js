// @flow

import React from "react";
import { View, Text, StyleSheet } from "react-native";

import jsonQuestions from "../../questions.json";

const styles = StyleSheet.create({
  question: {
    fontSize: 24,
  },
});

export default class Question extends React.Component {
  state = {
    questionsMap: new Map(),
  };

  prepareState = questionsMap => {
    jsonQuestions.map(({ question, anotherOne }, index) => {
      questionsMap.set(index, question);
    });
    console.log(questionsMap);
    return questionsMap;
  };

  fetchQuestions = () => {
    return new Promise((resolve, reject) => {
      const questionsMap = new Map();
      this.prepareState(questionsMap);
      resolve(questionsMap);
      reject("rejected");
    });
  };

  componentDidMount() {
    console.log("component did mount");
    this.fetchQuestions()
      .then(questionsMap => this.setState({ questionsMap }))
      .catch(console.log);
  }

  renderQuestion = index => {
    const { questionsMap } = this.state;
    return <Text style={styles.question}>{questionsMap.get(index)}</Text>;
  };

  render() {
    const { index } = this.props;
    return <View>{this.renderQuestion(index)}</View>;
  }
}
