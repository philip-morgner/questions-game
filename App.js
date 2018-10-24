// @flow

import React from "react";
import { StyleSheet, NavigatorIOS, Text, View } from "react-native";
import Main from "./src/App/Components/Main";
import Menu from "./src/App/Components/Menu/Menu";

const pageStyle = StyleSheet.create({
  nav: {
    flex: 1,
  },
  wrap: {
    backgroundColor: "green",
  },
});

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <NavigatorIOS
        style={pageStyle.nav}
        initialRoute={{
          title: "My First Title",
          component: Menu,
        }}
        navigationBarHidden={true}
        // translucent={true}
        // itemWrapperStyle={}
        // interactivePopGestureEnabled={true}
      />
    );
  }
}
