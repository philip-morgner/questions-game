// @flow

import React from "react";
import { StyleSheet, View, Text } from "react-native";
import NavButton from "./NavButton";
import type { Route } from "./NavButton";
import Menu from "./Menu";

const drinkResponsibly = "Drink Responsibly!";

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    backgroundColor: "skyblue",
    padding: "10%",
  },
});

type Props = {
  navigation: Object,
};

type State = {};

export default class LandingPage extends React.Component<Props, State> {
  render() {
    const { navigation } = this.props;
    const route = {
      component: "Menu",
      title: "Start",
    };
    return (
      <View key="start-the-game" style={styles.page}>
        <Text>{drinkResponsibly}</Text>
        <NavButton color="green" route={route} navigation={navigation} />
      </View>
    );
  }
}
