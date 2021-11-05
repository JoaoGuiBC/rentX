import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { Container, TotalCars } from './styles';

export function Header() {
  return (
    <Container>
      <Logo width={RFValue(108)} height={RFValue(12)} />
      <TotalCars>Total 12 carros</TotalCars>
    </Container>
  );
}
