// @flow
import React from "react";
import { StyleSheet, TextInput, ScrollView } from "react-native";
import { times } from "ramda";
import { ButtonGroup } from "react-native-elements";
import NavButton from "./NavButton";
import type { Route } from "./NavButton";
import Main from "./Main";
import PlayerSetUp from "./PlayerSetUp";
import type { Player } from "./PlayerSetUp";

const styles = StyleSheet.create({
  page: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
  input: {
    flex: 1,
    alignSelf: "flex-start",
    height: 20,
  },
  buttonGroup: {
    height: 20,
    margin: 8,
  },
});

type Props = {
  navigator: Object,
};

type State = {
  star?: boolean,
  numberOfPlayers: number,
};

export default class PlayerSetUpList extends React.Component<Props, State> {
  state = {
    numberOfPlayers: 4,
  };

  // later: debounce it
  handleNumberOfPlayers = (numberOfPlayers: number) => {
    this.setState({ numberOfPlayers });
  };

  // renderNumberOfPlayersInput = () => {
  //   return (
  //     <TextInput
  //       autoFocus
  //       clearTextOnFocus
  //       style={styles.input}
  //       placeholder="Anzahl der Spieler..."
  //       keyboardType="numeric"
  //       maxLength={2}
  //       onChangeText={this.handleNumberOfPlayers}
  //     />
  //   );
  // };

  // renderNumberOfPlayersBar = () => {
  //   const n = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  //   return (
  //     <ButtonGroup
  //       onPress={this.handleNumberOfPlayers}
  //       selectedIndex={this.state.numberOfPlayers + 1}
  //       buttons={n}
  //       containerStyle={styles.buttonGroup}
  //       innerBorderStyle={{ color: "white" }}
  //     />
  //   );
  // };

  // renderPlayerSetUpList = (n: number) => {
  //   return times(() => <PlayerSetUp key={n} />, n);
  // };

  renderPlayerSetUpList = () => {
    const setup = [];
    let i = 0;
    for (; i < this.state.numberOfPlayers; i++) {
      setup.push(<PlayerSetUp key={i} />);
    }
    return setup;
  };

  renderSubmit = () => {
    const { navigator } = this.props;
    //   later passProps category
    const route = { title: "START", component: Main };
    return <NavButton route={route} navigator={navigator} />;
  };
  render() {
    const { numberOfPlayers } = this.state;
    return (
      <ScrollView contentContainerStyle={styles.page}>
        {/* {this.renderNumberOfPlayersBar()} */}
        {this.renderPlayerSetUpList()}
        {this.renderSubmit()}
      </ScrollView>
    );
  }
}
