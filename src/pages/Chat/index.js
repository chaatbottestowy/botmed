import React, { useState } from 'react';
import { Platform, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import uuid from 'react-native-uuid';

import { Container, SendButton, SendButtonIcon } from './styles';
import {
  client_email,
  private_key,
  project_id,
} from '../../secrets/dialogconfig.json';

export default function Chat() {
  Dialogflow_V2.setConfiguration(
    client_email,
    private_key,
    Dialogflow_V2.LANG_PORTUGUESE_BRAZIL,
    project_id,
  );

  const botUser = {
    _id: 2,
    name: 'BotMed',
    avatar: require('../../assets/bot.png'),
  };

  const msg = {
    _id: 1,
    text:
      'Olá, eu sou o BotMed e estou aqui pra lhe ajudar. Vamos nos conhecer melhor me diga qual o seu nome?',
    createdAt: new Date(),
    user: botUser,
  };
  const [messages, setMessages] = useState([msg]);

  const onSend = (newMessage = []) => {
    setMessages(GiftedChat.append(messages, newMessage));
    let message = messages[-1].text;
    console.log(message);
    if (message._id !== msg._id) {
      Dialogflow_V2.requestQuery(
        message,
        result => handleResponse(result),
        error => console.log(error),
      );
    }
    return;
  };

  const handleResponse = result => {
    console.log(result);
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    let payload = result.queryResult.webhookPayload;
    showResponse(text, payload);
  };

  const showResponse = (text, payload) => {
    let newMsg = {
      _id: uuid.v4(),
      text: text.queryResult.fulfillmentText,
      createdAt: new Date(),
      user: botUser,
    };

    if (payload && payload.is_image) {
      console.log(text);
      newMsg.text = text;
      newMsg.image = payload.url;
    }
    setMessages(GiftedChat.append(messages, newMsg));
    // this.setState(previousState => ({
    //   messages: GiftedChat.append(previousState.messages, [msg]),
    // }));
  };

  const renderSend = props => (
    <Send {...props}>
      <SendButton>
        <SendButtonIcon
          source={require('../../assets/send.png')}
          resizeMode="cover"
        />
      </SendButton>
    </Send>
  );

  return (
    <Container>
      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView behavior="padding">
          <GiftedChat
            style={styles.container}
            messages={messages}
            placeholder="Digite sua menssagem..."
            isAnimated={true}
            onSend={newMessage => onSend(newMessage)}
            renderSend={renderSend}
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
          onSend={newMessage => onSend(newMessage)}
          renderSend={renderSend}
          user={{ _id: 1 }}
          locale="pt-BR"
        />
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
  },
});
