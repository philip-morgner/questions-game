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
  container: {
    marginTop: 18,
    justifyContent: "center",
    alignItems: "center",
    height: 170,
    width: 320,
    borderRadius: 25,
    backgroundColor: "#2EB3FF",
  },
  // use container style prop, make dynamic
  small: {
    marginTop: 18,
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
  input: {
    color: "white",
    fontSize: 20,
    marginLeft: 24,
    marginRight: 24,
  },
  checkboxesContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "white",
  },
  checkboxes: {
    backgroundColor: "#2EB3FF",
    borderColor: "#2EB3FF",
  },
  levelsTitle: {
    color: "white",
    marginTop: 16,
  },
  levels: {
    margin: 8,
    backgroundColor: "#2EB3FF",
    borderColor: "white",
    borderRadius: 15,
  },
});

export type Player = {
  name: string,
  sex: boolean,
  selectedLevel: 0 | 1 | 2,
};

type Props = {
  active: boolean,
  activate: () => void,
};

type State = Player & { fontLoaded: boolean };

export default class PlayerSetUp extends React.Component<Props, State> {
  state = {
    name: "",
    sex: true,
    selectedLevel: 1,
    fontLoaded: false,
  };

  async componentWillMount() {
    await Font.loadAsync({
      BalooBhai: require("../../../assets/fonts/BalooBhai-Regular.ttf"),
    });
    this.setState({ fontLoaded: true });
  }

  handleChangeText = (name: string) => {
    this.setState({ name });
  };

  handleCheck = (sex: string) => () => {
    const currState = this.state.sex;
    if (currState && sex === "w") return;
    if (!currState && sex === "m") return;
    this.setState({ sex: !currState });
  };

  handleLevelSelect = (selectedLevel: 0 | 1 | 2) => {
    this.setState({ selectedLevel });
  };

  renderAddPlayerButton = () => {
    const buttonText = "+  ADD PLAYER";
    const { activate } = this.props;
    const { fontLoaded } = this.state;
    return (
      <TouchableOpacity style={styles.addButtonView} onPress={activate}>
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

  renderNameInput = () => {
    return (
      <TextInput
        style={styles.input}
        placeholder="Spieler..."
        onChangeText={this.handleChangeText}
        maxLength={14}
      />
    );
  };

  renderSexCheckBoxes = () => {
    const checkedColor = "#f29959";
    const uncheckedColor = "white";
    const checkedIcon = "dot-circle-o";
    const uncheckedIcon = "circle-o";
    return (
      <View style={styles.checkboxesContainer}>
        <CheckBox
          key="w"
          title="weiblich"
          containerStyle={styles.checkboxes}
          checkedIcon={checkedIcon}
          uncheckedIcon={uncheckedIcon}
          checkedColor={checkedColor}
          uncheckedColor={uncheckedColor}
          checked={this.state.sex}
          onPress={this.handleCheck("w")}
        />
        <CheckBox
          key="m"
          title="männlich"
          containerStyle={styles.checkboxes}
          checkedIcon={checkedIcon}
          uncheckedIcon={uncheckedIcon}
          checkedColor={checkedColor}
          uncheckedColor={uncheckedColor}
          checked={!this.state.sex}
          onPress={this.handleCheck("m")}
        />
      </View>
    );
  };

  renderLevelButtonGroup = () => {
    const levels = ["Lusche", "Normalo", "Alki"];
    return [
      <Text key="title" style={styles.levelsTitle}>
        Trinkfestigkeit des Spielers
      </Text>,
      <ButtonGroup
        key="button-group"
        onPress={this.handleLevelSelect}
        selectedIndex={this.state.selectedLevel}
        buttons={levels}
        containerStyle={styles.levels}
        innerBorderStyle={{ color: "white" }}
      />,
    ];
  };

  render() {
    const { activate, active } = this.props;
    return active ? (
      <View style={styles.container}>
        {this.renderSexCheckBoxes()}
        {this.renderNameInput()}
        {this.renderLevelButtonGroup()}
      </View>
    ) : (
      <View style={styles.small}>{this.renderAddPlayerButton()}</View>
    );
  }
}
