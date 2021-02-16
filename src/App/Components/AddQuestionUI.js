// @flow

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";

const styles = StyleSheet.create({
  pageStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

type Props = {};

type State = {
  text: string,
};

export default class AddQuestionUI extends React.Component<Props, State> {
  state = {
    text: "",
  };

  handleChangeText = (text: string) => {
    this.setState({ text });
  };

  handleSubmit = () => {
    console.log(this.state.text);
  };

  renderInput = () => {
    return (
      <TextInput
        placeholder="add question"
        onChangeText={this.handleChangeText}
      />
    );
  };

  renderSubmitButton = () => {
    return (
      <TouchableWithoutFeedback onPress={this.handleSubmit}>
        <View>
          <Text>Submit</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    return (
      <View style={styles.pageStyle}>
        {this.renderInput()}
        {this.renderSubmitButton()}
      </View>
    );
  }
}
