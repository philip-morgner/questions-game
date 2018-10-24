// @flow

import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Font } from "expo";

// later: react-navigation

export type Route = {
  component: Object,
  title: string,
  passProps?: Object,
};

type Props = {
  route: Route,
  navigator: Object,
  color?: string,
};
type State = { fontLoaded: boolean };

const styles = (fontLoaded: boolean) => (colorProp?: string) =>
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
      margin: 16,
    },
    buttonText: {
      color: "white",
      fontSize: 20,
      fontFamily: fontLoaded ? "BalooBhai" : null,
    },
  });
// light: #2EB3FF normal: #2E93FF

export default class NavButton extends React.Component<Props, State> {
  state = { fontLoaded: false };

  async componentWillMount() {
    await Font.loadAsync({
      BalooBhai: require("../../../assets/fonts/BalooBhai-Regular.ttf"),
    });
    this.setState({ fontLoaded: true });
  }

  navigateTo = (route: Route) => () => {
    this.props.navigator.push(route);
  };

  render() {
    const { route, color } = this.props;
    const styleReady = styles(this.state.fontLoaded);
    return (
      <TouchableOpacity
        style={styleReady().container}
        onPress={this.navigateTo(route)}>
        <View style={styleReady(color).button}>
          <Text style={styleReady().buttonText}>{route.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
