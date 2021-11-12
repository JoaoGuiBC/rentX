import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

import { Header } from '../../components/Header';
import { Car } from '../../components/Car';
import { RootStackParamList } from '../../routes/stack.routes';

import { Container, CarList } from './styles';

type HomeNavigation = StackNavigationProp<RootStackParamList, 'Home'>;

export function Home() {
  const { navigate } = useNavigation<HomeNavigation>();

  function handleGoToCarDetails() {
    navigate('CarDetails');
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header />

      <CarList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        keyExtractor={(item) => String(item)}
        renderItem={() => (
          <Car
            brand="AUDI"
            name="RS 5 Coupé"
            rent={{
              period: 'Ao dia',
              price: 120,
            }}
            thumbnail="https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png"
            onPress={handleGoToCarDetails}
          />
        )}
      />
    </Container>
  );
}
