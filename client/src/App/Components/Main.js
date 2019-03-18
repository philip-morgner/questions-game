// @flow

import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { times, identity } from "ramda";
import Question from "./Question";

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flex: 4,
    backgroundColor: "#48BBEC",
    paddingLeft: 16,
    paddingRight: 16,
  },
});

const randomize = (count: number) => {
  const randomSeq = [];
  times((n: number) => {
    const shuffle = (n: number) => {
      const random = Math.floor(Math.random() * count);
      if (randomSeq.some(r => r === random)) {
        return shuffle(n);
      }
      randomSeq.push(random);
      n--;
    };
    return shuffle(n);
  }, count);

  return randomSeq;
};

type Props = {
  navigation: Object,
};

type State = {
  index: number,
  data: Array<Object>,
  randomSeq: Array<number>,
};

export default class Main extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const data = JSON.parse(props.navigation.getParam("data", []));
    this.state = {
      index: 0,
      data,
      randomSeq: randomize(data.length),
    };
  }

  handleMoveForward = () => {
    const { navigation } = this.props;
    const { index, randomSeq } = this.state;
    if (index === -1) {
      navigation.navigate("Menu");
    } else if (index < randomSeq.length - 1) {
      this.setState({ index: index + 1 });
    } else {
      this.setState({ index: -1 });
    }
  };

  handleMoveBack = () => {
    const { index } = this.state;
    if (index > 0) {
      this.setState({ index: index - 1 });
    }
  };

  getQuestion = () => {
    const { randomSeq, index, data } = this.state;
    if (index !== -1) {
      const pos = randomSeq[index];

      return data[pos].question;
    }
    return "Game Over\nChug your Drink!";
  };

  getAnswer = () => {
    const { randomSeq, index, data } = this.state;
    if (index !== -1) {
      const pos = randomSeq[index];

      return data[pos].answer || "";
    }
    return "";
  };

  render() {
    const { navigation } = this.props;
    const question = this.getQuestion();
    const answer = this.getAnswer();

    return (
      <View style={styles.page}>
        <Question
          question={question}
          answer={answer}
          moveBack={this.handleMoveBack}
          moveForward={this.handleMoveForward}
          navigation={navigation}
        />
      </View>
    );
  }
}
