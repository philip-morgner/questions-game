// @flow

import React from "react";
import { StyleSheet, NavigatorIOS, Text, View } from "react-native";
import LandingPage from "./src/App/Components/LandingPage";
import PlayerSetUpList from "./src/App/Components/PlayerSetUpList";

const pageStyle = StyleSheet.create({
  nav: {
    flex: 1,
  },
});

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <NavigatorIOS
        style={pageStyle.nav}
        initialRoute={{
          title: "My First Title",
          component: LandingPage,
        }}
        navigationBarHidden={true}
        // translucent={true}
        // itemWrapperStyle={}
        // interactivePopGestureEnabled={true}
      />
    );
  }
}
