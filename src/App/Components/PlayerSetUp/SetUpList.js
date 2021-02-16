// @flow
import React from "react";
import {
  StyleSheet,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Text,
} from "react-native";
import {
  times,
  find,
  findIndex,
  propEq,
  update,
  pathOr,
  remove,
  isNil,
} from "ramda";
import { ButtonGroup } from "react-native-elements";

import NavButton from "../NavButton";
import type { Route } from "../NavButton";
import Main from "../Main";
import PlayerSetUp from "./SetUpComponent";
import SetUpNew from "./SetUpNew";
import type { Player } from "../PlayerSetUp";

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 20,
  },
  list: {
    alignItems: "center",
  },
  input: {
    alignSelf: "flex-start",
    height: 20,
    marginLeft: 32,
  },
  buttonGroup: {
    alignSelf: "center",
    height: 20,
    margin: 8,
  },
});

const newId = (count: number) =>
  Number(
    Math.random()
      .toString(2 + count)
      .substr(2, 9)
  );

type Props = {
  navigation: Object,
};

type State = {
  star?: boolean,
  count: number,
  players: Array<Player>,
};

// TODOS
// do not start game without players, no doubled players
// do not navigate back to playersetup -> in-game possibilty to change setup
// make landscape mode available
// think about if only one gender participates
export default class PlayerSetUpList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      count: 1,
      players: [],
    };
  }

  isNameValid = (name: string) => {
    const { players } = this.state;
    const exists = find(propEq("name", name))(players);
    return isNil(exists);
  };

  addPlayer = () => {
    let { players, count } = this.state;
    const player = { name: "", gender: "m", level: 0, id: newId(count) };
    players.push(player);
    count += 1;
    this.setState({ players, count });
  };

  removePlayer = (id: number) => () => {
    const { players, count } = this.state;
    const index = findIndex(propEq("id", id))(players);
    const playersList = remove(index, 1, players);
    this.setState({
      players: playersList,
      count: count - 1,
    });
  };

  updatePlayer = (id: number) => (attr: string) => (raw: string | number) => {
    const playersList = this.state.players;
    const player = find(propEq("id", id))(playersList);
    const index = findIndex(propEq("id", id))(playersList);
    if (attr === "name") {
      const value = String(raw).trim();
      if (!this.isNameValid(value)) {
        throw new Error("Du Idiot! Name already exists...");
      }
      // (?) it already updates state here
      player[attr] = value;
      Keyboard.dismiss();
    } else {
      player[attr] = raw;
    }
    const players = update(index, player, playersList);
    this.setState({ players });
  };

  handleSubmit = async () => {
    // const players = JSON.stringify(this.state.players);
    // const encodedPlayers = encodeURI(players);
    // const url = `http://${LOCAL}:9000/questions?players=${encodedPlayers}`;

    console.log("send state", this.state.players);
    return this.state.players;
  };

  renderPlayerSetUp = (player: Player) => {
    const { id } = player;
    return (
      <PlayerSetUp
        key={`key-${id}`}
        player={player}
        setUpHandler={this.updatePlayer(id)}
        removeHandler={this.removePlayer}
      />
    );
  };

  renderPlayerSetUpList = (n: number) => {
    let key = 0;

    return times(() => {
      // increase key AFTER player is initialized
      const player = this.state.players[key++];
      // condition: show one "+ Add Player"-Button
      if (n === key) {
        return <SetUpNew key={key} setUpHandler={this.addPlayer} />;
      }
      return this.renderPlayerSetUp(player);
    }, n);
  };

  renderSubmit = () => {
    const { navigation } = this.props;
    const route = { title: "Los geht's!", component: "Main" };
    return (
      <NavButton
        onPress={this.handleSubmit}
        route={route}
        navigation={navigation}
        color="green"
      />
    );
  };

  render() {
    const { count } = this.state;
    return (
      <ScrollView contentContainerStyle={styles.list}>
        <KeyboardAvoidingView style={styles.page} behavior="position" enabled>
          <Text style={{ fontSize: 36, paddingTop: 40 }}>Spieler</Text>
          {this.renderPlayerSetUpList(count)}
          {this.renderSubmit()}
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
