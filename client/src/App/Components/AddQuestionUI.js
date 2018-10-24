// @flow

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import Question from "./Questions";

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

  //   const Http = new XMLHttpRequest();
  //   const url='https://jsonplaceholder.typicode.com/posts';
  //   Http.open("GET", url);
  //   Http.send();
  //   Http.onreadystatechange=(e)=>{
  //   console.log(Http.responseText)
  //   }

  // const http = new XMLHttpRequest();
  // const url = 'get_data.php';
  // const params = 'orem=ipsum&name=binny';
  // http.open('POST', url, true);

  // //Send the proper header information along with the request
  // http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  // http.onreadystatechange = () => {//Call a function when the state changes.
  //     if(http.readyState == 4 && http.status == 200) {
  //         alert(http.responseText);
  //     }
  // }
  // http.send(params);

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
