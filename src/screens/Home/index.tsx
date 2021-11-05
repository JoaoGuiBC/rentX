import React from 'react';
import { StatusBar } from 'react-native';

import { Header } from '../../components/Header';
import { Car } from '../../components/Car';

import { Container } from './styles';

export function Home() {
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header />

      <Car
        brand="AUDI"
        name="RS 5 Coupé"
        rent={{
          period: 'Ao dia',
          price: 120,
        }}
        thumbnail="https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png"
      />
      <Car
        brand="porsche"
        name="Panamera"
        rent={{
          period: 'Ao dia',
          price: 340,
        }}
        thumbnail="https://www.webmotors.com.br/imagens/prod/347515/PORSCHE_PANAMERA_4.0_V8_EHYBRID_TURBO_S_PDK_34751516170869484.png?s=fill&w=130&h=97&q=70&t=true"
      />
    </Container>
  );
}
