import React from 'react';
import { StatusBar } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { RootStackParamList } from '../../routes/stack.routes';

import ArrowSvg from '../../assets/arrow.svg';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';
import { Calendar } from '../../components/Calendar';

type SchedulingNavigation = StackNavigationProp<
  RootStackParamList,
  'Scheduling'
>;

export function Scheduling() {
  const theme = useTheme();

  const { navigate } = useNavigation<SchedulingNavigation>();

  function handleConfirmRental() {
    navigate('SchedulingDetails');
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <BackButton color={theme.colors.shape} onPress={() => {}} />

        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue isSelected>08 Novembro 2021</DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue isSelected={false} />
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}
