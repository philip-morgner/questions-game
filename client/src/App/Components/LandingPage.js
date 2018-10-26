// @flow

import React from "react";
import { StyleSheet, View } from "react-native";
import NavButton from "./NavButton";
import type { Route } from "./NavButton";
import Menu from "./Menu";

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    backgroundColor: "skyblue",
  },
});

type Props = {
  navigation: Object,
};

type State = {};

// stateless => rewrite!
export default class LandingPage extends React.Component<Props, State> {
  render() {
    const { navigation } = this.props;
    const route = {
      component: Menu,
      title: "Menu",
    };
    return (
      <View key="start-the-game" style={styles.page}>
        <NavButton route={route} navigation={navigation} />
      </View>
    );
  }
}
