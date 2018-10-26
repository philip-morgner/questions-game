// flow has issues with map and promise types

import React from "react";
import { View, Text } from "react-native";
import { Font } from "expo";
import jsonQuestions from "../../../questions.json";

export default class Question extends React.Component {
  state = {
    questionsMap: new Map(),
    fontsLoaded: false,
    fonts: [],
  };

  prepareState = questionsMap => {
    jsonQuestions.map(({ question }, index) => {
      questionsMap.set(index, question);
    });
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

  async componentWillMount() {
    // add nice font family, use style sheet
    await Font.loadAsync({
      BalooBhai: require("../../../assets/fonts/BalooBhai-Regular.ttf"),
    });
    const fonts = ["Calligraffitti", "GiveYouGlory", "SedgewickAve"];
    this.setState({ fontsLoaded: true });
    this.fetchQuestions()
      .then(questionsMap => this.setState({ questionsMap }))
      .catch(console.log);
  }

  renderQuestion = index => {
    const { questionsMap, fontsLoaded } = this.state;
    return (
      <Text
        style={{
          fontSize: 36,
          fontFamily: fontsLoaded ? "BalooBhai" : null,
          textAlign: "center",
        }}>
        {questionsMap.get(index)}
      </Text>
    );
  };

  render() {
    const { index } = this.props;
    return <View>{this.renderQuestion(index)}</View>;
  }
}
