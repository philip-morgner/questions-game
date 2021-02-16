// @flow

import React from "react";
import { createStackNavigator } from "react-navigation";

import LandingPage from "./src/App/Components/LandingPage";
import PlayerSetUpList from "./src/App/Components/PlayerSetUp";
import Main from "./src/App/Components/Main";
import Menu from "./src/App/Components/Menu";
import AddQuestionUI from "./src/App/Components/AddQuestionUI";

const RootStack = createStackNavigator(
  {
    Home: LandingPage,
    PlayerSetUpList: PlayerSetUpList,
    Main: Main,
    Menu: Menu,
    AddQuestionUI: AddQuestionUI,
  },
  {
    initialRouteName: "Home",
    navigationOptions: {
      header: null,
    },
  }
);
export default class App extends React.Component<{}, {}> {
  render() {
    return <RootStack />;
  }
}
