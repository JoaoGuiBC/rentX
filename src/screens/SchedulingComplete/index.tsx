import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { RootStackParamList } from '../../routes/stack.routes';

import { ConfirmButton } from '../../components/ConfirmButton';

import { Container, Content, Title, Message, Footer } from './styles';

type SchedulingCompleteNavigation = StackNavigationProp<
  RootStackParamList,
  'SchedulingComplete'
>;

export function SchedulingComplete() {
  const { width } = useWindowDimensions();

  const { navigate } = useNavigation<SchedulingCompleteNavigation>();

  function handleReturnToHome() {
    navigate('Home');
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Carro alugado!</Title>

        <Message>
          Agora você só precisa ir {'\n'}
          até a concessionária {'\n'}
          para retirar o seu automóvel.
        </Message>
      </Content>

      <Footer>
        <ConfirmButton title="OK" onPress={handleReturnToHome} />
      </Footer>
    </Container>
  );
}
