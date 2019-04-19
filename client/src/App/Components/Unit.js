// @flow

import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Font } from "expo";
import NavButton from "./NavButton";
import Menu from "./Menu";
import { path, pathOr, isNil } from "ramda";

const styles = (fontLoaded?: boolean, hidden?: boolean) =>
  StyleSheet.create({
    text: {
      fontSize: 28,
      fontFamily: fontLoaded ? "BalooBhai" : null,
      textAlign: "center",
    },
    wrapper: {
      flex: 1,
      backgroundColor: hidden ? "#FEF387" : "lightblue",
      borderRadius: 15,
      marginTop: hidden ? 16 : 8,
      marginBottom: hidden ? 8 : 16,
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

export type DataUnit = {
  type: "question" | "task",
  question: string,
  task: string,
  answer?: string,
  time?: number,
};

type Props = {
  unit: DataUnit,
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

// TODO
// size of cards should be consistent
export default class Question extends React.Component<Props, State> {
  state = {
    fontLoaded: false,
    remaining: pathOr(0, ["unit", "time"], this.props),
    timeIsUp: false,
    timerId: undefined,
  };

  async componentWillMount() {
    await Font.loadAsync({
      BalooBhai: require("../../../assets/fonts/BalooBhai-Regular.ttf"),
    });
    this.setState({ fontLoaded: true });
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (
      prevProps.unit[prevProps.unit.type] !==
      this.props.unit[this.props.unit.type]
    ) {
      clearInterval(prevState.timerId);
      this.setState({
        timerId: undefined,
        remaining: pathOr(0, ["unit", "time"], this.props),
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

  renderCards = (type: string) => {
    const {
      unit: { answer, [type]: data },
      moveForward,
    } = this.props;
    const { fontLoaded, timeIsUp } = this.state;

    const renderCard = (
      cardData: string = "",
      key: string,
      hide: boolean = false
    ) => (
      <TouchableWithoutFeedback
        key={key}
        disabled={!timeIsUp}
        onPress={moveForward}>
        <View style={styles(fontLoaded, hide).wrapper}>
          <Text style={styles(fontLoaded).text}>{hide ? "?" : cardData}</Text>
        </View>
      </TouchableWithoutFeedback>
    );

    if (!isNil(answer)) {
      return [
        renderCard(data, "question"),
        renderCard(answer, "answer", !timeIsUp),
      ];
    }

    return renderCard(data, "task");
  };

  renderClock = (remaining: number) => {
    if (remaining === 60) return "1:00";
    if (remaining > 9) return "0:" + remaining;
    return "0:0" + remaining;
  };

  renderTimer = () => {
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
      console.log("press");
      const timerId = setInterval(countDown, 1000);
      this.setState({ timerId });
    };

    return (
      <View style={styles().footer}>
        <Text style={styles(fontLoaded).timer}>
          {timerId && this.renderClock(remaining)}
        </Text>
        <View style={styles().start}>
          <Text style={styles(fontLoaded).text} onPress={timerId ? end : start}>
            {timerId ? "Stop" : "Start"}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    const { timeIsUp } = this.state;
    const { type, time } = pathOr(null, ["unit"], this.props);
    const data = pathOr("", ["unit", type], this.props);

    return [
      <View key="header" style={styles().header}>
        {this.renderActions()}
      </View>,
      <View key="body" style={styles().body}>
        {this.renderCards(type)}
      </View>,
      <View key="footer" style={styles().footer}>
        {!isNil(time) && this.renderTimer()}
      </View>,
    ];
  }
}
