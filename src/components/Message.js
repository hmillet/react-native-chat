import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

import Settings from "../config/Settings";

export default class Message extends React.Component {
  state = {
    username: "",
    message: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      username: props.message.from,
      message: props.message.message
    };
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  static defaultProps = {};

  static propTypes = {
    message: PropTypes.object.isRequired
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>De : {this.state.username}</Text>
        <Text>{this.state.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: Settings.color.footer,
    borderColor: "#bbb",
    borderWidth: StyleSheet.hairlineWidth,
    padding: 12,
    marginVertical: 8
  },
  input: {
    flex: 1,
    backgroundColor: Settings.color.footer
  },
  button: {
    height: 30,
    backgroundColor: "red"
  }
});
