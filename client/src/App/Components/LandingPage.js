// @flow

import React from "react";
import {
  StyleSheet,
  NavigatorIOS,
  Text,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
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
  navigator: Object,
};

type State = {};

export default class LandingPage extends React.Component<Props, State> {
  render() {
    const { navigator } = this.props;
    const route = {
      component: Menu,
      title: "START THE GAME",
    };
    return (
      <View key="start-the-game" style={styles.page}>
        <NavButton route={route} navigator={navigator} />
      </View>
    );
  }
}
