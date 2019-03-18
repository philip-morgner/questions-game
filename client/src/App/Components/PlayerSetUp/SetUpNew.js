// @flow
import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CheckBox, ButtonGroup } from "react-native-elements";
import { Font } from "expo";

// #B32404 rot
// #EC8B1E blau
// #3C85BF hellblau

// check for unnecessary stuff
const styles = StyleSheet.create({
  // use container style prop, make dynamic
  small: {
    marginTop: 36,
    justifyContent: "center",
    alignItems: "center",
    height: 130,
    width: 320,
    borderRadius: 25,
    backgroundColor: "#2EB3FF",
  },
  addButtonView: {
    justifyContent: "center",
    backgroundColor: "#3C85BF",
    borderRadius: 25,
    alignItems: "center",
    height: 85,
    width: 215,
  },
  addButton: {
    color: "white",
    fontSize: 25,
  },
});

type Props = {
  setUpHandler: () => void,
};

type State = { fontLoaded: boolean };

export default class SetUpNew extends React.Component<Props, State> {
  state = {
    fontLoaded: false,
  };

  async componentWillMount() {
    await Font.loadAsync({
      BalooBhai: require("../../../../assets/fonts/BalooBhai-Regular.ttf"),
    });
    this.setState({ fontLoaded: true });
  }

  renderAddPlayerButton = () => {
    const buttonText = "+ ADD PLAYERS";
    const { setUpHandler } = this.props;
    const { fontLoaded } = this.state;
    return (
      <TouchableOpacity style={styles.addButtonView} onPress={setUpHandler}>
        <Text
          style={[
            styles.addButton,
            {
              fontFamily: fontLoaded ? "BalooBhai" : null,
            },
          ]}>
          {buttonText}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    return <View style={styles.small}>{this.renderAddPlayerButton()}</View>;
  }
}
