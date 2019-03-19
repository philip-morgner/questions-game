// @flow
import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { CheckBox, ButtonGroup } from "react-native-elements";
import { Font } from "expo";
import debounce from "lodash.debounce";

import { pathOr } from "ramda";
import type { Player } from "../PlayerSetUp";

// #B32404 rot
// #EC8B1E blau
// #3C85BF hellblau

// check for unnecessary stuff
const styles = StyleSheet.create({
  container: {
    marginTop: 36,
    justifyContent: "center",
    alignItems: "center",
    height: 170,
    width: 320,
    borderRadius: 25,
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
    marginBottom: 12,
    backgroundColor: "#2EB3FF",
    borderColor: "white",
    borderRadius: 15,
  },
  cancelButton: {
    backgroundColor: "red",
    borderRadius: 20,
    color: "white",
    position: "absolute",
    bottom: -24,
    zIndex: 2,
    borderRadius: 15,
    padding: 8,
    overflow: "hidden",
  },
});

type Props = {
  player: Player,
  setUpHandler: (attr: string) => (raw: string | number) => void,
  removeHandler: (id: number) => () => void,
  scrollToEnd: Function,
};

type State = { fontLoaded: boolean };

export default class PlayerSetUp extends React.Component<Props, State> {
  state = {
    fontLoaded: false,
  };

  async componentWillMount() {
    await Font.loadAsync({
      BalooBhai: require("../../../../assets/fonts/BalooBhai-Regular.ttf"),
    });
    this.setState({ fontLoaded: true });
  }

  inputHandler = (name: string) => this.props.setUpHandler("name")(name);

  inputHandlerDebounced = debounce(this.inputHandler, 1000);

  renderNameInput = () => {
    return (
      <TextInput
        autoCorrect={false}
        autoFocus={true}
        enablesReturnKeyAutomatically={true}
        onSubmitEditing={this.props.scrollToEnd}
        returnKeyType="done"
        style={styles.input}
        placeholder="Spieler..."
        onChangeText={this.inputHandlerDebounced}
        maxLength={14}
      />
    );
  };

  renderRemoveButton = (id: number) => {
    return (
      <Text style={styles.cancelButton} onPress={this.props.removeHandler(id)}>
        remove
      </Text>
    );
  };

  renderSexCheckBoxes = (selected: "m" | "w") => {
    const sexes = ["m", "w"];
    const checkedColor = "#f29959";
    const uncheckedColor = "white";
    const checkedIcon = "dot-circle-o";
    const uncheckedIcon = "circle-o";
    return (
      <View style={styles.checkboxesContainer}>
        {sexes.map(sex => (
          <CheckBox
            key={sex}
            title={sex === "w" ? "weiblich" : "männlich"}
            containerStyle={styles.checkboxes}
            checkedIcon={checkedIcon}
            uncheckedIcon={uncheckedIcon}
            checkedColor={checkedColor}
            uncheckedColor={uncheckedColor}
            checked={selected === sex}
            onPress={() => this.props.setUpHandler("sex")(sex)}
          />
        ))}
      </View>
    );
  };

  renderLevelButtonGroup = (level: number) => {
    const levels = ["Lusche", "Normalo", "Alki"];
    return [
      <Text key="title" style={styles.levelsTitle}>
        Trinkfestigkeit des Spielers
      </Text>,
      <ButtonGroup
        key="button-group"
        onPress={this.props.setUpHandler("level")}
        selectedIndex={level}
        buttons={levels}
        containerStyle={styles.levels}
        innerBorderStyle={{ color: "white" }}
      />,
    ];
  };

  render() {
    const { sex, level, id } = pathOr(
      { sex: "m", level: 0, id: undefined },
      ["player"],
      this.props
    );

    return (
      <View style={styles.container}>
        {this.renderSexCheckBoxes(sex)}
        {this.renderRemoveButton(id)}
        {this.renderNameInput()}
        {this.renderLevelButtonGroup(level)}
      </View>
    );
  }
}
