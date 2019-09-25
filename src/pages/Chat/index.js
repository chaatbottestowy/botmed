import React, { Component } from 'react';
import { Platform, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { GiftedChat, Send } from 'react-native-gifted-chat';

import { Container, SendButton, SendButtonIcon } from './styles';
import {
  client_email,
  private_key,
  project_id,
} from '../../secrets/dialogconfig.json';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.botUser = {
      _id: 2,
      name: 'BotMed',
      avatar: require('../../assets/bot.png'),
    };
    this.msg = {
      _id: 1,
      text:
        'Olá, eu sou o BotMed 🤖 e estou aqui pra lhe ajudar.\n\nVamos nos conhecer melhor me diga qual o seu nome?',
      createdAt: new Date(),
      user: this.botUser,
    };
  }
  state = {
    messages: [],
  };

  onSend = (messages = []) => {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      result => this.handleResponse(result),
      error => console.log(error),
    );
  };

  handleResponse(result) {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    let payload = result.queryResult.webhookPayload;
    this.showResponse(text, payload);
  }

  showResponse(text, payload) {
    let newMsg = {
      _id: this.state.messages.length + 1,
      text: text,
      createdAt: new Date(),
      user: this.botUser,
    };
    if (payload && payload.is_image) {
      newMsg.image = payload.url;
    }
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, newMsg),
    }));
  }

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      client_email,
      private_key,
      Dialogflow_V2.LANG_PORTUGUESE_BRAZIL,
      project_id,
    );
    this.setState({
      messages: [this.msg, ...this.state.messages],
    });
  }

  renderSend(props) {
    return (
      <Send {...props}>
        <SendButton>
          <SendButtonIcon
            source={require('../../assets/send.png')}
            resizeMode="cover"
          />
        </SendButton>
      </Send>
    );
  }
  render() {
    const { messages } = this.state;
    return (
      <Container>
        {Platform.OS === 'android' ? (
          <KeyboardAvoidingView behavior="padding">
            <GiftedChat
              style={styles.container}
              messages={messages}
              placeholder="Digite sua menssagem..."
              isAnimated={true}
              onSend={newMessage => this.onSend(newMessage)}
              renderSend={this.renderSend}
              user={{ _id: 1 }}
              locale="pt-BR"
            />
          </KeyboardAvoidingView>
        ) : (
          <GiftedChat
            style={styles.container}
            messages={messages}
            placeholder="Digite sua menssagem..."
            isAnimated={true}
            onSend={newMessage => this.onSend(newMessage)}
            renderSend={this.renderSend}
            user={{ _id: 1 }}
            locale="pt-BR"
          />
        )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
  },
});
