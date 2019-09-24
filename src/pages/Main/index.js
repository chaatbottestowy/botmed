import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet } from 'react-native';

import {
  Container,
  Logo,
  Title,
  Button,
  ButtonText,
  Description,
} from './styles';

export default function Main({ navigation }) {
  return (
    <Container>
      <Logo source={require('../../assets/bot.png')} resizeMode="contain" />
      <Title>Bem-vindo ao BotMed</Title>
      <Description>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit!
      </Description>
      <Button onPress={() => navigation.navigate('Chat')}>
        <LinearGradient
          style={styles.buttonColor}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#57aef5', '#2d5c82']}>
          <ButtonText>Começar</ButtonText>
        </LinearGradient>
      </Button>
    </Container>
  );
}

const styles = StyleSheet.create({
  buttonColor: {
    paddingVertical: 15,
    paddingHorizontal: 80,
    alignItems: 'center',
    borderRadius: 5,
  },
});
