// @flow
import React from "react";
import {
  StyleSheet,
  TextInput,
  ScrollView,
  Keyboard,
  // View,
  ListView,
  KeyboardAvoidingView,
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

const IP_MAXB = "172.20.10.7";
const LOCAL = "95.91.211.99";

const mockedData = [
  { question: "hallo", answer: "und hier auch die answer" },
  { question: "hier", answer: "und hier auch die answer1" },
  { question: "die", answer: "und hier auch die answer2" },
  { question: "question", answer: "und hier auch die answer3" },
  { question: "hallo hier die question", answer: "und hier auch die answer4" },
];

const mockedServerData = JSON.stringify(mockedData);

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  list: {
    alignItems: "center",
    paddingTop: 65,
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
  Math.random()
    .toString(2 + count)
    .substr(2, 9);

type Props = {
  navigation: Object,
};

type State = {
  star?: boolean,
  count: number,
  players: Array<Player>,
};

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
    const player = { name: "", sex: "m", level: 0, id: newId(count) };
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

  handleSubmit = () => {
    const players = JSON.stringify(this.state.players);
    const encodedPlayers = encodeURI(players);
    const url = `http://${LOCAL}:9000/questions?players=${encodedPlayers}`;

    // fetch(url)
    //   .then(res => res.json())
    //   .then(json => console.log("json", json))
    //   .catch(e => console.log("error", e));

    console.log("mocked fetch", mockedServerData);
    return mockedServerData;
  };

  scrollToEnd = () => {
    // $FlowFixMe
    this.scrollView.scrollToEnd({ animated: true });
  };

  renderPlayerSetUp = (player: Player) => {
    const { id } = player;
    return (
      <PlayerSetUp
        key={`key-${id}`}
        player={player}
        setUpHandler={this.updatePlayer(id)}
        removeHandler={this.removePlayer}
        scrollToEnd={this.scrollToEnd}
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
    const route = { title: "Main", component: Main };
    return (
      <NavButton
        onPress={this.handleSubmit}
        route={route}
        navigation={navigation}
      />
    );
  };

  render() {
    const { count } = this.state;
    return (
      <KeyboardAvoidingView style={styles.page} behavior="padding" enabled>
        <ScrollView
          contentContainerStyle={styles.list}
          onContentSizeChange={this.scrollToEnd}
          // $FlowFixMe
          ref={ref => (this.scrollView = ref)}>
          {this.renderPlayerSetUpList(count)}
          {this.renderSubmit()}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
