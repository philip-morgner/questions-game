// @flow

import PropTypes from "prop-types";
import React from "react";
import { Button } from "react-native";

// work on it later
// import { createStackNavigator } from "react-navigation";

// const nav = createStackNavigator({
//   Home: { screen: HomeScreen },
//   Profile: { screen: ProfileScreen },
// });

type Props = {
  navigator: Object,
  title: string,
  color?: string,
};

// stateless... rewrite
export default class NavButton extends React.Component<Props, {}> {
  static propTypes = {
    title: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
  };

  handlePress = (title: string) => {
    this.props.navigator.push({
      title,
    });
  };

  render() {
    const { navigator, title, color } = this.props;
    return <Button onPress={this.handlePress(title)} color={`${color}`} />;
  }
}
