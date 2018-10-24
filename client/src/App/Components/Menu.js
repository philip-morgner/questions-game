// @flow
import PropTypes from "prop-types";
import React from "react";
import {
  StyleSheet,
  NavigatorIOS,
  Text,
  View,
  Button,
  TouchableHighlight,
} from "react-native";
import NavButton from "./NavButton";
import type { Route } from "./NavButton";
import Main from "./Main";
import PlayerSetUpList from "./PlayerSetUpList";
import AddQuestionUI from "./AddQuestionUI";

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const menuOptions = [
  { title: "START", component: PlayerSetUpList },
  { title: "ADD A QUESTION", component: AddQuestionUI },
  { title: "LOREM IPSUM", component: Main },
  { title: "LOREM IPSUM", component: Main },
];

type Props = {
  navigator: Object,
};

type State = {};

// stateless => rewrite!
export default class Menu extends React.Component<Props, State> {
  renderMenuButton = (route: Route, i: number) => {
    const { navigator } = this.props;
    return <NavButton key={i} route={route} navigator={navigator} />;
  };
  render() {
    return (
      <View style={styles.page}>
        {menuOptions.map((route, i) => this.renderMenuButton(route, i))}
      </View>
    );
  }
}
