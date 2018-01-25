import React from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import PropTypes from "prop-types";

import Settings from "../config/Settings";

export default class Footer extends React.Component {
  state = {
    messageToSend: ""
  };

  static defaultProps = {};

  static propTypes = {
    sendMessage: PropTypes.func.isRequired
  };

  _sendMessage = message => {
    console.debug("Footer._sendMessage : " + message);
    if (message) {
      if (this.props.sendMessage(message)) {
        this.setState({ messageToSend: "" });
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          underlineColorAndroid="#666666"
          placeholder="message"
          placeholderTextColor="#bbbbbb"
          onChangeText={messageToSend => this.setState({ messageToSend })}
          value={this.state.messageToSend}
          multiline={true}
          maxHeight={80}
          autoGrow={false}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this._sendMessage(this.state.messageToSend);
          }}
        >
          <Text>OO</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: Settings.color.footer,
    borderTopColor: "#bbb",
    borderTopWidth: StyleSheet.hairlineWidth
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
