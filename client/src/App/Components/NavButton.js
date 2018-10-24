// @flow

import PropTypes from "prop-types";
import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Font } from "expo";

// later: react-navigation

export type Route = {
  component: Object,
  title: string,
};

type Props = {
  route: Route,
  navigator: Object,
  color?: string,
};

type State = {};

const styles = colorProp =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      width: "80%",
    },
    button: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      width: "80%",
      height: 50,
      backgroundColor: !!colorProp ? colorProp : "#3C85BF",
      borderRadius: 25,
    },
    buttonText: {
      color: "white",
      fontSize: 20,
    },
  });
// light: #2EB3FF normal: #2E93FF

type State = { fontLoaded: boolean };
// stateless... rewrite
export default class NavButton extends React.Component<Props, State> {
  state = { fontLoaded: false };

  async componentWillMount() {
    await Font.loadAsync({
      BalooBhai: require("../../../assets/fonts/BalooBhai-Regular.ttf"),
    });
    this.setState({ fontLoaded: true });
  }

  navigateTo = ({ component, title }: Route) => () => {
    this.props.navigator.push({
      component,
      title,
    });
  };

  render() {
    const { route, color } = this.props;
    return (
      <TouchableOpacity
        style={styles().container}
        onPress={this.navigateTo(route)}>
        <View style={styles(color).button}>
          <Text style={styles().buttonText}>{route.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
