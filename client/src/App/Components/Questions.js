import React from "react";
import { View, Text, StyleSheet } from "react-native";

import jsonQuestions from "../../../questions.json";
import { Font } from "expo";

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

  async componentWillMount() {
    await Font.loadAsync({
      Calligraffitti: require("../../../assets/fonts/Calligraffitti-Regular.ttf"),
      GiveYouGlory: require("../../../assets/fonts/GiveYouGlory.ttf"),
      SedgewickAve: require("../../../assets/fonts/SedgwickAve-Regular.ttf"),
      BalooBhai: require("../../../assets/fonts/BalooBhai-Regular.ttf"),
      Mogra: require("../../../assets/fonts/Mogra-Regular.ttf"),
    });
    const fonts = ["Calligraffitti", "GiveYouGlory", "SedgewickAve"];
    this.setState({ fontsLoaded: true, fonts });
    this.fetchQuestions()
      .then(questionsMap => this.setState({ questionsMap }))
      .catch(console.log);
  }

  // randomFontFamily = () => {
  //   const { fonts } = this.state;
  //   return fonts[Math.floor(Math.random() * fonts.length)];
  // };

  renderQuestion = index => {
    const { questionsMap, fontsLoaded } = this.state;
    return (
      <Text
        style={{
          fontSize: 36,
          fontFamily: fontsLoaded ? "BalooBhaigud" : null,
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
