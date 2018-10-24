// // @flow
// // is flow useful here?

// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// import jsonQuestions from "../../../questions.json";
// import { Font } from "expo";

// type Props = {
//   index: number,
// };

// type State = {
//   questionsMap: Map<?number, ?string>,
//   fontsLoaded: boolean,
//   fonts: Array<string>,
// };

// export default class Question extends React.Component<Props, State> {
//   state = {
//     questionsMap: new Map<?number, ?string>(),
//     fontsLoaded: false,
//     fonts: [],
//   };

//   prepareState = (questionsMap: Map<?number, ?string>) => {
//     jsonQuestions.map(({ question }, index: number) => {
//       questionsMap.set(index, question);
//     });
//     console.log(questionsMap);
//     return questionsMap;
//   };

//   fetchQuestions = () => {
//     return new Promise<Map<?number, ?string>>((resolve, reject) => {
//       const questionsMap = new Map();
//       this.prepareState(questionsMap);
//       resolve(questionsMap);
//       reject("rejected");
//     });
//   };

//   async componentWillMount() {
//     await Font.loadAsync({
//       Calligraffitti: require("../../../assets/fonts/Calligraffitti-Regular.ttf"),
//       GiveYouGlory: require("../../../assets/fonts/GiveYouGlory.ttf"),
//       SedgewickAve: require("../../../assets/fonts/SedgwickAve-Regular.ttf"),
//     });
//     const fonts = ["Calligraffitti", "GiveYouGlory", "SedgewickAve"];
//     this.setState({ fontsLoaded: true, fonts });
//     this.fetchQuestions()
//       .then(questionsMap => this.setState({ questionsMap }))
//       .catch(console.log);
//   }

//   randomFontFamily = () => {
//     const { fonts } = this.state;
//     return fonts[Math.floor(Math.random() * fonts.length)];
//   };

//   renderQuestion = (index: number) => {
//     const { questionsMap, fontsLoaded } = this.state;
//     return (
//       <Text
//         style={{
//           fontSize: 36,
//           fontFamily: fontsLoaded ? this.randomFontFamily() : null,
//           textAlign: "center",
//         }}>
//         {questionsMap.get(index)}
//       </Text>
//     );
//   };

//   render() {
//     const { index } = this.props;
//     return <View>{this.renderQuestion(index)}</View>;
//   }
// }
