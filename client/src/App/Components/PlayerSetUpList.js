// @flow
import React from "react";
import {
  StyleSheet,
  TextInput,
  ScrollView,
  Keyboard,
  View,
} from "react-native";
import { times } from "ramda";
import { ButtonGroup } from "react-native-elements";
import debounce from "lodash.debounce";

import NavButton from "./NavButton";
import type { Route } from "./NavButton";
import Main from "./Main";
import PlayerSetUp from "./PlayerSetUp";
import type { Player } from "./PlayerSetUp";

const styles = StyleSheet.create({
  page: {
    flex: 1,
    height: 200,
  },
  list: {
    alignItems: "center",
  },
  input: {
    alignSelf: "flex-start",
    height: 20,
    marginLeft: 16,
  },
  buttonGroup: {
    alignSelf: "center",
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
  constructor(props) {
    super(props);
    this.state = {
      numberOfPlayers: 10,
    };
    this.handleNumberOfPlayers = debounce(this.handleNumberOfPlayers, 300);
  }

  // later: debounce it
  handleNumberOfPlayers = (numberOfPlayers: number) => {
    // Keyboard.dismiss();
    this.setState({ numberOfPlayers });
  };

  renderNumberOfPlayersInput = () => {
    return (
      <TextInput
        clearTextOnFocus
        style={styles.input}
        placeholder="Anzahl der Spieler..."
        keyboardType="numeric"
        maxLength={2}
        onChangeText={this.handleNumberOfPlayers}
      />
    );
  };

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

  renderPlayerSetUp = (key: number) => () => {
    key += 1;
    return <PlayerSetUp key={key} />;
  };

  renderPlayerSetUpList = (n: number) => {
    let key = 0;
    return times(this.renderPlayerSetUp(key), n);
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
      <View styles={styles.page}>
        <ScrollView contentContainerStyle={styles.list}>
          {this.renderNumberOfPlayersInput()}
          {this.renderPlayerSetUpList(numberOfPlayers)}
          {this.renderSubmit()}
        </ScrollView>
      </View>
    );
  }
}
