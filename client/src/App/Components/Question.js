// @flow

import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Font } from "expo";
import NavButton from "./NavButton";
import Menu from "./Menu";

const styles = (fontLoaded?: boolean, type?: string) =>
  StyleSheet.create({
    text: {
      fontSize: 28,
      fontFamily: fontLoaded ? "BalooBhai" : null,
      textAlign: "center",
    },
    wrapper: {
      flex: 1,
      backgroundColor: type === "question" ? "lightblue" : "#FEF387",
      borderRadius: 15,
      marginTop: type === "question" ? 16 : 8,
      marginBottom: type === "question" ? 8 : 16,
      padding: 8,
    },
    action: {
      fontFamily: fontLoaded ? "BalooBhai" : null,
      fontSize: 24,
      textAlign: "center",
      width: 100,
    },
    actionWrapper: {
      backgroundColor: "green",
      borderRadius: 15,
    },
    header: {
      flex: 0,
      flexDirection: "row",
      justifyContent: "space-between",

      marginTop: 70,
    },
    body: {
      flex: 5,
      justifyContent: "center",
    },
    footer: {
      flex: 0,
      alignItems: "center",
      paddingBottom: 40,
      height: 180,
    },
    start: {
      backgroundColor: "yellow",
      borderRadius: 15,
      width: 150,
      marginTop: 16,
    },
    timer: {
      fontSize: 24,
      fontFamily: fontLoaded ? "BalooBhai" : null,
      textAlign: "center",
      color: "red",
      height: 40,
    },
    endGame: {
      fontFamily: fontLoaded ? "BalooBhai" : null,
      fontSize: 24,
      textAlign: "center",
      width: 100,
      color: "darkred",
    },
  });

type Props = {
  question: string,
  answer: string,
  moveBack: () => void,
  moveForward: () => void,
  navigation: Object,
};

type State = {
  fontLoaded: boolean,
  remaining: number,
  timeIsUp: boolean,
  timerId?: IntervalID,
};

export default class Question extends React.Component<Props, State> {
  state = {
    fontLoaded: false,
    remaining: 5,
    timeIsUp: false,
    timerId: undefined,
  };

  async componentWillMount() {
    await Font.loadAsync({
      BalooBhai: require("../../../assets/fonts/BalooBhai-Regular.ttf"),
    });
    // const fonts = ["Calligraffitti", "GiveYouGlory", "SedgewickAve"];
    this.setState({ fontLoaded: true });
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.answer !== prevProps.answer) {
      clearInterval(this.state.timerId);
      this.setState({
        timerId: undefined,
        remaining: 5,
        timeIsUp: false,
      });
    }
  }

  renderActions = () => {
    const { fontLoaded } = this.state;
    const { moveBack, moveForward, navigation } = this.props;
    const endGame = () => {
      navigation.navigate("Menu");
    };

    const actions = [
      { name: "\u2190", onPress: moveBack },
      { name: "END", onPress: endGame },
      { name: "\u2192", onPress: moveForward },
    ];
    // $FlowFixMe
    return actions.map(({ name, onPress }) => (
      <View key={name} style={styles().actionWrapper}>
        <Text
          onPress={onPress}
          style={
            name === "END"
              ? styles(fontLoaded).endGame
              : styles(fontLoaded).action
          }>
          {name}
        </Text>
      </View>
    ));
  };

  renderCard = (type: string) => {
    const { answer, question, moveForward } = this.props;
    const { fontLoaded, timeIsUp } = this.state;
    return (
      <TouchableWithoutFeedback
        key={type}
        disabled={!timeIsUp}
        onPress={moveForward}>
        <View style={styles(fontLoaded, type).wrapper}>
          <Text style={styles(fontLoaded).text}>
            {type === "question"
              ? question
              : this.state.timeIsUp
              ? answer
              : "?"}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderTimer = (answer: string) => {
    const { fontLoaded, remaining, timerId } = this.state;

    const end = () => {
      const { timerId } = this.state;
      this.setState({ timeIsUp: true, remaining: 0 });
      clearInterval(timerId);
    };

    const countDown = () => {
      this.setState({ remaining: this.state.remaining - 1 });
      if (this.state.remaining === 0) {
        end();
      }
    };

    const start = () => {
      const timerId = setInterval(countDown, 1000);
      this.setState({ timerId });
    };

    return (
      <View style={styles().footer}>
        <Text style={styles(fontLoaded).timer}>
          {timerId && `0:${remaining < 10 ? "0" : ""}${remaining}`}
        </Text>
        <View style={styles().start}>
          <Text style={styles(fontLoaded).text} onPress={timerId ? end : start}>
            {timerId ? "Answer" : "Start"}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    const { question, answer } = this.props;
    const { timeIsUp } = this.state;

    return [
      <View key="header" style={styles().header}>
        {this.renderActions()}
      </View>,
      <View key="body" style={styles().body}>
        {[this.renderCard("question"), this.renderCard("answer")]}
      </View>,
      <View key="footer" style={styles().footer}>
        {answer !== "" && this.renderTimer(answer)}
      </View>,
    ];
  }
}
