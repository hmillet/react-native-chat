import React from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  View
} from "react-native";

import Settings from "../config/Settings";
import Message from "../components/Message";
import Footer from "../components/Footer";

export default class MainScreen extends React.Component {
  state = {
    connected: false,
    username: "hmillet",
    messages: []
  };

  static navigationOptions = {
    title: "Chat WAYA TECH",
    headerStyle: {
      backgroundColor: Settings.color.header
    },
    headerTitleStyle: {
      color: "#ffffff"
    }
  };

  _connect() {
    this.ws = new WebSocket("ws://dev.waya-tech.com:6455/");

    this.ws.onopen = () => {
      // connection opened
      console.log("Socket is open :-).");
      this.ws.send(JSON.stringify({ username: this.state.username }));
      this.setState({ connected: true });
    };

    this.ws.onmessage = e => {
      // a message was received
      //alert(e.data);
      console.log(e.data);
      try {
        const O_message = JSON.parse(e.data);
        this.setState(prevState => ({
          messages: [...prevState.messages, O_message]
        }));
      } catch (e) {
        console.error("Invalid JSON : " + e.data);
      }
    };

    this.ws.onerror = e => {
      // an error occurred
      console.log(e.message);
    };

    this.ws.onclose = e => {
      // connection closed
      this.setState({ connected: false });
      //console.debug(e);
      console.log("Socket is closed. Reconnect will be attempted in 1 second.");
      setTimeout(() => {
        this._connect();
      }, 1000);
    };
  }

  componentDidMount() {
    this._connect();
  }
  _sendMessage = message => {
    console.debug("MainScreen._sendMessage : " + message);
    if (this.ws && message) {
      try {
        this.ws.send(message);
        return true;
      } catch (exception) {}
    }
    return false;
  };
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>Connecté : {this.state.connected ? "OUI" : "NON"}</Text>
        </View>
        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps={"always"}
        >
          <FlatList
            data={this.state.messages}
            renderItem={({ item }) => <Message message={item} />}
            keyExtractor={(item, index) => index}
          />
        </ScrollView>
        <Footer sendMessage={this._sendMessage} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Settings.color.background,
    flex: 1
  }
});
