import React from 'react';
import { StatusBar } from 'react-native';

import { Header } from '../../components/Header';
import { Car } from '../../components/Car';

import { Container, CarList } from './styles';

export function Home() {
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
          />
        )}
      />
    </Container>
  );
}
