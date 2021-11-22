import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { Container, TotalCars } from './styles';

interface HeaderProps {
  carsQuantity: number;
}

export function Header({ carsQuantity }: HeaderProps) {
  return (
    <Container>
      <Logo width={RFValue(108)} height={RFValue(12)} />
      <TotalCars>Total de {carsQuantity} carros</TotalCars>
    </Container>
  );
}
