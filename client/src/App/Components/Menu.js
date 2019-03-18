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
  },
});

const menuOptions = [
  { title: "PlayerSetUpList", component: PlayerSetUpList },
  { title: "AddQuestionUI", component: AddQuestionUI },
  { title: "Main", component: Main },
  { title: "Main", component: Main },
];

type Props = {
  navigation: Object,
};

type State = {};

// stateless => rewrite!
export default class Menu extends React.Component<Props, State> {
  renderMenuButton = (route: Route, i: number) => {
    const { navigation } = this.props;
    return <NavButton key={i} route={route} navigation={navigation} />;
  };
  render() {
    return (
      <View style={styles.page}>
        {menuOptions.map((route, i) => this.renderMenuButton(route, i))}
      </View>
    );
  }
}
