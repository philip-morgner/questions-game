// @flow

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Font } from "expo";

export type Route = {
  component: Object,
  title: string,
};

type Props = {
  navigation: Object,
  route: Route,
  onPress?: Function,
  data?: any,
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
      backgroundColor: colorProp || "#3C85BF",
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

class NavButton extends React.Component<Props, State> {
  state = { fontLoaded: false };

  async componentWillMount() {
    await Font.loadAsync({
      BalooBhai: require("../../../assets/fonts/BalooBhai-Regular.ttf"),
    });
    this.setState({ fontLoaded: true });
  }

  handlePress = async () => {
    const { navigation, route, onPress } = this.props;
    const navigateTo = (route: string, props: Object) => {
      navigation.navigate(route, props);
    };
    let data;
    if (onPress) {
      data = await onPress();
    }
    navigateTo(route.title, { data });
  };

  render() {
    const { route, color } = this.props;
    const style = styles(this.state.fontLoaded);
    return (
      <TouchableOpacity style={style().container} onPress={this.handlePress}>
        <View style={style(color).button}>
          <Text style={style().buttonText}>{route.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default NavButton;
