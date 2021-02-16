// @flow
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, View } from "react-native";
import NavButton from "./NavButton";
import type { Route } from "./NavButton";
import Main from "./Main";
import PlayerSetUpList from "./PlayerSetUp";
import AddQuestionUI from "./AddQuestionUI";

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: "10%",
  },
});

const menuOptions = [
  { title: "Normales Spiel", component: "PlayerSetUpList" },
  { title: "Modus wählen", component: "PlayerSetUpList" },
  { title: "Datenbank erweitern", component: "AddQuestionUI" },
];

type Props = {
  navigation: Object,
};

type State = {};

export default class Menu extends React.Component<Props, State> {
  renderMenuButton = (route: Route, i: number) => {
    const color = "green";
    const { navigation } = this.props;
    return (
      <NavButton
        key={i}
        route={route}
        navigation={navigation}
        color={route.title === "Normales Spiel" ? color : undefined}
      />
    );
  };
  render() {
    return (
      <View style={styles.page}>
        {menuOptions.map((route, i) => this.renderMenuButton(route, i))}
      </View>
    );
  }
}
