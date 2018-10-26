// @flow
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { CheckBox, ButtonGroup, Divider } from "react-native-elements";

// check for unnecessary stuff
const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    alignItems: "center",
    alignSelf: "center",
    height: 170,
    width: "85%",
    borderRadius: 15,
    backgroundColor: "#2EB3FF",
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

type Props = {};

type State = Player;

export default class PlayerSetUp extends React.Component<Props, State> {
  state = {
    name: "",
    sex: true,
    selectedLevel: 1,
  };

  handleChangeText = (name: string) => {
    this.setState({ name });
    console.log(name);
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

  handleCheck = (sex: string) => () => {
    const currState = this.state.sex;
    if (currState && sex === "w") return;
    if (!currState && sex === "m") return;
    this.setState({ sex: !currState });
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

  handleLevelSelect = (selectedLevel: 0 | 1 | 2) => {
    this.setState({ selectedLevel });
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
    return (
      <View style={styles.container}>
        {this.renderSexCheckBoxes()}
        {this.renderNameInput()}
        {this.renderLevelButtonGroup()}
      </View>
    );
  }
}
